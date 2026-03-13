import { Routes } from '@angular/router';
import { notFoundGuard } from './core/guards/not-found.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'conversations',
    loadChildren: () =>
      import('./features/conversations/conversations.routes').then((m) => m.CONVERSATIONS_ROUTES),
  },
  {
    path: '**',
    canActivate: [notFoundGuard],
    loadComponent: () => import('./shared/components/not-found/not-found').then((m) => m.NotFound),
  },
];
