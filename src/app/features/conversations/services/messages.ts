import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Message } from '../models/message';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private firestore: Firestore = inject(Firestore);

  getMessages(conversationId: string): Observable<Message[]> {
    const messagesRef = collection(this.firestore, `conversations/${conversationId}/messages`);
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<Message[]>;
  }

  sendMessage(conversationId: string, message: Partial<Message>): Observable<any> {
    const messagesRef = collection(this.firestore, `conversations/${conversationId}/messages`);
    const payload = {
      ...message,
      createdAt: serverTimestamp(),
    };

    return of(addDoc(messagesRef, payload));
  }
}
