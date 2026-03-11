import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  increment,
  orderBy,
  query,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Message } from '../models/message';
import { from, Observable, of, switchMap } from 'rxjs';
import { ChatsService } from './chats';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private firestore: Firestore = inject(Firestore);
  private chatsService: ChatsService = inject(ChatsService);

  getMessages(conversationId: string): Observable<Message[]> {
    const messagesRef = collection(this.firestore, `conversations/${conversationId}/messages`);
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<Message[]>;
  }

  sendMessage(
    conversationId: string,
    senderUid: string,
    message: Partial<Message>,
  ): Observable<any> {
    const messagesRef = collection(this.firestore, `conversations/${conversationId}/messages`);

    return from(
      addDoc(messagesRef, {
        ...message,
        createdAt: serverTimestamp(),
      }),
    ).pipe(
      switchMap(() =>
        this.chatsService.updateConversation(conversationId, {
          lastMessage: message.text,
          lastMessageTime: serverTimestamp(),
          lastMessageSenderId: senderUid,
          unreadCount: increment(1),
        }),
      ),
    );
  }
}
