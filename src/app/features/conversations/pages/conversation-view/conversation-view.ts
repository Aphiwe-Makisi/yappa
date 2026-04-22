import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, filter, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../../../../core/services/auth';
import { ChatsService } from '../../services/chats';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../../services/messages';
import { Conversation } from '../../models/conversation';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageBubble } from '../../components/message-bubble/message-bubble';
import { IonButton, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonTitle, IonToolbar, IonButtons } from '@ionic/angular/standalone';
import { Avatar } from "../../../../shared/components/avatar/avatar";
import { ChatDatePipe } from "../../../../shared/pipes/chat-dat.pipe";

@Component({
  selector: 'app-conversation-view',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessageBubble,
    IonHeader,
    IonFooter,
    IonContent,
    IonToolbar,
    IonIcon,
    IonButton,
    IonInput,
    IonTitle,
    IonToolbar,
    IonButtons,
    Avatar,
    ChatDatePipe
],
  templateUrl: './conversation-view.html',
  styleUrl: './conversation-view.css',
})
export class ConversationView {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private chatService: ChatsService = inject(ChatsService);
  private messageService: MessagesService = inject(MessagesService);
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @ViewChild(IonContent) content!: IonContent;

  conversationId$ = this.route.params.pipe(map((params) => params['id']));
  conversation$: Observable<Conversation | null> = combineLatest([
    this.authService.uid$,
    this.conversationId$,
  ]).pipe(
    filter(([uid, conversationId]) => !!uid && !!conversationId),
    switchMap(([uid, conversationId]) =>
      this.chatService.getConversationWithUser(conversationId, uid ?? ''),
    ),
  );
  messages$ = this.conversationId$.pipe(
    switchMap((id) => this.messageService.getMessages(id)),
    tap(() => {
      setTimeout(() => this.scrollToBottom(), 300);
    }),
  );

  form!: FormGroup;

  ngOnInit() {
    this.initForm();
    this.updateUnreadCount();
  }

  initForm(): void {
    this.form = this.fb.group({
      message: ['', Validators.required],
    });
  }

  back(): void {
    this.router.navigate(['/tabs/chats']);
  }

  send(): void {
    if (this.form.invalid) return;

    const message = this.form.get('message')?.value;

    combineLatest([this.authService.uid$, this.conversationId$])
      .pipe(
        take(1),
        switchMap(([uid, conversationId]) =>
          this.messageService.sendMessage(conversationId, uid ?? '', {
            senderId: uid ?? '',
            text: message,
          }),
        ),
      )
      .subscribe({
        next: () => this.form.reset(),
        // TODO: show error toastr
        error: (err) => console.error('Failed to send:', err),
      });
  }

  updateUnreadCount(): void {
    combineLatest([this.authService.uid$, this.conversation$])
      .pipe(
        take(1),
        switchMap(([uid, conv]) => {
          if (conv?.lastMessageSenderId !== uid) {
            this.chatService.resetUnreadCount(conv?.id ?? '');
          }
          return of(null);
        }),
      )
      .subscribe();
  }

  scrollToBottom(): void {
    this.content.scrollToBottom(300);
  }
}
