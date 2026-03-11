import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, switchMap, take } from 'rxjs';
import { AuthService } from '../../../../core/services/auth';
import { ChatsService } from '../../services/chats';
import { CommonModule } from '@angular/common';
import { ConversationHeader } from '../../components/conversation-header/conversation-header';
import { MessagesService } from '../../services/messages';
import { Conversation } from '../../models/conversation';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-conversation-view',
  imports: [CommonModule, ConversationHeader, InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './conversation-view.html',
  styleUrl: './conversation-view.css',
})
export class ConversationView {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private chatService: ChatsService = inject(ChatsService);
  private messageService: MessagesService = inject(MessagesService);
  private authService: AuthService = inject(AuthService);
  private fb: FormBuilder = inject(FormBuilder);

  conversationId$ = this.route.params.pipe(map((params) => params['conversationId']));
  conversation$: Observable<Conversation | null> = combineLatest([
    this.authService.uid$,
    this.conversationId$,
  ]).pipe(
    switchMap(([uid, conversationId]) =>
      this.chatService.getConversationWithUser(conversationId, uid ?? ''),
    ),
  );
  messages$ = this.conversationId$.pipe(switchMap((id) => this.messageService.getMessages(id)));

  form!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      message: ['', Validators.required],
    });
  }

  send(): void {
    if (this.form.invalid) return;

    const message = this.form.get('message')?.value;

    combineLatest([this.authService.uid$, this.conversationId$])
      .pipe(
        take(1),
        switchMap(([uid, conversationId]) =>
          this.messageService.sendMessage(conversationId, { senderId: uid ?? '', text: message }),
        ),
      )
      .subscribe({
        next: () => this.form.reset(),
        // TODO: show error toastr
        error: (err) => console.error('Failed to send:', err),
      });
  }
}
