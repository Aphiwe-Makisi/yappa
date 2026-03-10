import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, Firestore, query, where, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Conversation } from '../../../core/models/conversation';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);

  getUserConversations(): Observable<Conversation[]> {
    const uid = this.auth.currentUser?.uid;
    const convRef = collection(this.firestore, 'conversations');
    const q = query(convRef, where('participants', 'array-contains', uid));
    return collectionData(q, { idField: 'id' }) as Observable<Conversation[]>;
  }
}
