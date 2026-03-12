import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { BehaviorSubject, finalize, from, map, Observable, switchMap, take } from 'rxjs';
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

  signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string): Observable<UserCredential> {
    this._loading$.next(true);
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((cred) =>
        this.userService
          .updateUser(cred.user.uid, { isOnline: true })
          .pipe(map(() => cred))
          .pipe(finalize(() => this._loading$.next(false))),
      ),
    );
  }

  signOut(): Observable<void> {
    return this.currentUser$.pipe(
      take(1),
      switchMap((user) => {
        if (!user) {
          return from(signOut(this.auth));
        }

        // Make sure updateUser completes before signing out
        return this.userService
          .updateUser(user.uid, {
            isOnline: false,
            lastSeen: serverTimestamp(),
          })
          .pipe(
            switchMap(() => {
              // wrap signOut in from() to convert Promise → Observable
              return from(signOut(this.auth));
            }),
          );
      }),
    );
  }
}
