import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/signin/signin').then((m) => m.Signin),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/signin/signin').then((m) => m.Signin),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/signup/signup').then((m) => m.Signup),
  },

  // TODO: Move this to the correct feature folder
  {
    path: 'conversations',
    loadComponent: () =>
      import('./pages/conversation-list/conversation-list').then((m) => m.ConversationList),
  },
];
