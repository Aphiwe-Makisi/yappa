import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ConversationItem } from '../../components/conversation-item/conversation-item';
import { ChatsService } from '../../services/chats';
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  filter,
  finalize,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { UserService } from '../../../../core/services/user';
import { AuthService } from '../../../../core/services/auth';
import { Router } from '@angular/router';
import { SkeletonLoader } from '../../components/skeleton-loader/skeleton-loader';

@Component({
  selector: 'app-conversation-list',
  imports: [CommonModule, ButtonModule, OrderListModule, ConversationItem, SkeletonLoader],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.css',
})
export class ConversationList {
  chatsService: ChatsService = inject(ChatsService);
  userService: UserService = inject(UserService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  conversationsWithUsers$ = this.authService.uid$.pipe(
    filter((uid): uid is string => !!uid),
    switchMap((uid) => this.chatsService.getConversationsWithUsers(uid)),
  );

  logout(): void {
    this.authService.signOut().subscribe({
      next: () => this.router.navigateByUrl('/'),
    });
  }
}
