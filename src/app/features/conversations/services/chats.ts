import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, Firestore, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class Chats {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);

  getUserConversations() {
    const uid = this.auth.currentUser?.uid;

    const conversationsRef = collection(this.firestore, 'conversations');

    const q = query(conversationsRef, where('participants', 'array-contains', uid));

    return q;
  }
}
