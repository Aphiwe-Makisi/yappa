import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { AuthService } from '../../../../core/services/auth';
import { ChatsService } from '../../services/chats';
import { CommonModule } from '@angular/common';
import { ConversationHeader } from '../../components/conversation-header/conversation-header';

@Component({
  selector: 'app-conversation-view',
  imports: [CommonModule, ConversationHeader],
  templateUrl: './conversation-view.html',
  styleUrl: './conversation-view.css',
})
export class ConversationView {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authService: AuthService = inject(AuthService);
  private chatService: ChatsService = inject(ChatsService);

  conversation$ = combineLatest([
    this.authService.uid$,
    this.route.params.pipe(map((params) => params['conversationId'])),
  ]).pipe(
    switchMap(([uid, conversationId]) =>
      this.chatService.getConversationWithMessages(uid ?? '', conversationId),
    ),
  );
}
