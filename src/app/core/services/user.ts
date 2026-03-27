import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { UserProfile } from '../models/user-profile';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private injector: Injector = inject(Injector);
  firestore: Firestore = inject(Firestore);

  async ensureUserExists(user: User): Promise<any> {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
        isOnline: true,
        lastSeen: serverTimestamp(),
      });
    }
  }

  getUser(uid: string): Observable<UserProfile> {
    return runInInjectionContext(this.injector, () => {
      const userRef = doc(this.firestore, 'users', uid);
      return docData(userRef, { idField: 'uid' }) as Observable<UserProfile>;
    });
  }

  // TODO: In future we will need to only get users that have
  // the current user in their friend list
  getAllUsers(currentUid: string): Observable<UserProfile[]> {
    const ref = collection(this.firestore, 'users');
    const q = query(ref, where('uid', '!=', currentUid));
    return collectionData(q, { idField: 'id' }) as Observable<UserProfile[]>;
  }

  updateUser(uid: string, data: any): Observable<any> {
    const ref = doc(this.firestore, `users/${uid}`);
    return from(updateDoc(ref, data, { merge: true }));
  }
}
