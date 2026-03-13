import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { map, take } from 'rxjs';

export const notFoundGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map((user) =>
      user ? router.createUrlTree(['/conversations']) : router.createUrlTree(['/auth']),
    ),
  );
};
