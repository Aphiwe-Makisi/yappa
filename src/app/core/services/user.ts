import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { User } from '@angular/fire/auth';
import { doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { UserProfile } from '../models/user-profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private injector: Injector = inject(Injector);
  firestore: Firestore = inject(Firestore);

  async ensureUserExists(user: User, data: UserProfile): Promise<any> {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, data);
    }
  }

  getUser(uid: string): Observable<UserProfile> {
    const ref = doc(this.firestore, `users/${uid}`);
    return runInInjectionContext(this.injector, () => {
      const userRef = doc(this.firestore, 'users', uid);
      return docData(userRef, { idField: 'uid' }) as Observable<UserProfile>;
    });
  }
}
