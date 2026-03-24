import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, of, switchMap, take } from 'rxjs';
import { AuthService } from '../services/auth';
import { UserService } from '../services/user';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const userService: UserService = inject(UserService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    switchMap((user) => {
      if (!user) return of(router.createUrlTree(['/auth/login']));

      return userService.getUser(user.uid).pipe(
        map((profile) => {
          if (profile) return true;
          return router.createUrlTree(['/auth/login']);
        }),
      );
    }),
  );
};
