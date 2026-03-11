import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ConversationItem } from '../../components/conversation-item/conversation-item';
import { ChatsService } from '../../services/chats';
import { switchMap } from 'rxjs';
import { UserService } from '../../../../core/services/user';
import { AuthService } from '../../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation-list',
  imports: [CommonModule, ButtonModule, OrderListModule, ConversationItem],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.css',
})
export class ConversationList {
  chatsService: ChatsService = inject(ChatsService);
  userService: UserService = inject(UserService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  conversationsWithUsers$ = this.authService.uid$.pipe(
    switchMap((uid) => this.chatsService.getConversationsWithUsers(uid ?? '')),
  );
}
