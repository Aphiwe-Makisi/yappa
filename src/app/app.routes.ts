import { Routes } from '@angular/router';
import { notFoundGuard } from './core/guards/not-found.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'tabs',
    loadComponent: () =>
      import('./shared/components/tabs/tabs').then((m) => m.Tabs),
    children: [
      {
        path: 'chats',
        loadComponent: () =>
          import('./features/conversations/pages/conversation-list/conversation-list').then((m) => m.ConversationList),
      },
      {
        path: 'friends',
        loadComponent: () =>
          import('./features/conversations/pages/new-conversation/new-conversation').then((m) => m.NewConversation),
      },
      {
        path: '',
        redirectTo: 'chats',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'conversations/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./features/conversations/pages/conversation-view/conversation-view').then((m) => m.ConversationView)
  },
  {
    path: '**',
    canActivate: [notFoundGuard],
    loadComponent: () =>
      import('./shared/components/not-found/not-found').then((m) => m.NotFound),
  },
];
