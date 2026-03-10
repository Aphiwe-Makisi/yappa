import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ConversationItem } from '../../components/conversation-item/conversation-item';
import { Conversation } from '../../../../core/models/conversation';
import { BottomNavigation } from '../../../../shared/components/bottom-navigation/bottom-navigation';
import { ChatsService } from '../../services/chats';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { UserService } from '../../../../core/services/user';
import { AuthService } from '../../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation-list',
  imports: [CommonModule, ButtonModule, OrderListModule, ConversationItem, BottomNavigation],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.css',
})
export class ConversationList {
  chatsService: ChatsService = inject(ChatsService);
  userService: UserService = inject(UserService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  conversationsWithUsers$ = combineLatest([
    this.authService.uid$,
    this.chatsService.getUserConversations(),
  ]).pipe(
    switchMap(([uid, convs]) => {
      if (!convs.length) return of([]);

      const streams = convs.map((conv) => {
        const otherUid = conv.participants.find((id: string) => id !== uid);
        if (!otherUid) return of({ ...conv, otherUser: null });

        return this.userService
          .getUser(otherUid)
          .pipe(map((user) => ({ ...conv, otherUser: user })));
      });

      return combineLatest(streams);
    }),
  );
}
