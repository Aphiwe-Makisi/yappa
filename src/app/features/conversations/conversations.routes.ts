import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const CONVERSATIONS_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../conversations/pages/conversation-list/conversation-list').then(
        (m) => m.ConversationList,
      ),
  },
  {
    path: ':conversationId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../conversations/pages/conversation-view/conversation-view').then(
        (m) => m.ConversationView,
      ),
  },
];
