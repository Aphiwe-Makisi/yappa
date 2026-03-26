import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from '@angular/fire/auth';
import {
  BehaviorSubject,
  catchError,
  finalize,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
} from 'rxjs';
import { UserService } from './user';
import { serverTimestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private userService: UserService = inject(UserService);
  currentUser$ = authState(this.auth);
  uid$ = this.currentUser$.pipe(map((user) => user?.uid));
  private _loading$ = new BehaviorSubject<boolean>(false);
  public readonly loading = this._loading$.asObservable();

  async signUp(email: string, password: string, displayName: string): Promise<UserCredential> {
    const userCredentials = await createUserWithEmailAndPassword(this.auth, email, password);

    if (userCredentials.user) {
      await updateProfile(userCredentials.user, { displayName: displayName });
    }

    return userCredentials;
  }

  signIn(email: string, password: string): Observable<UserCredential> {
    this._loading$.next(true);

    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((cred) =>
        from(this.userService.ensureUserExists(cred.user)).pipe(
          switchMap(() =>
            this.userService.updateUser(cred.user.uid, {
              isOnline: true,
              lastSeen: serverTimestamp(),
            }),
          ),
          map(() => cred),
          finalize(() => this._loading$.next(false)),
        ),
      ),
    );
  }

  signOut(): Observable<void> {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return from(signOut(this.auth));

    return this.userService
      .updateUser(uid, {
        isOnline: false,
        lastSeen: serverTimestamp(),
      })
      .pipe(
        catchError(() => of(null)),
        switchMap(() => from(signOut(this.auth))),
      );
  }
}
