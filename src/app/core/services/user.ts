import { inject, Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore: Firestore = inject(Firestore);

  async ensureUserExists(user: User, data: UserProfile): Promise<any> {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, data);
    }
  }
}
