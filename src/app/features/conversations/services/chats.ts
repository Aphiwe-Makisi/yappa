import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  Firestore,
  query,
  where,
  collectionData,
  doc,
  docData,
  updateDoc,
  addDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { catchError, combineLatest, from, map, Observable, of, switchMap, take } from 'rxjs';
import { Conversation } from '../models/conversation';
import { UserService } from '../../../core/services/user';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  private userService: UserService = inject(UserService);

  getUserConversations(): Observable<Conversation[]> {
    const uid = this.auth.currentUser?.uid;
    const convRef = collection(this.firestore, 'conversations');
    const q = query(convRef, where('participants', 'array-contains', uid));
    return collectionData(q, { idField: 'id' }) as Observable<Conversation[]>;
  }

  getConversation(id: string): Observable<Conversation> {
    const convRef = doc(this.firestore, `conversations/${id}`);
    return docData(convRef, { idField: 'id' }) as Observable<Conversation>;
  }

  private withOtherUser(conv: Conversation, uid: string): Observable<Conversation> {
    const otherUid = conv.participants.find((id: string) => id !== uid);
    if (!otherUid) return of({ ...conv, otherUser: null });
    return this.userService.getUser(otherUid).pipe(map((user) => ({ ...conv, otherUser: user })));
  }

  getConversationsWithUsers(uid: string): Observable<Conversation[]> {
    return this.getUserConversations().pipe(
      switchMap((convs) => {
        if (!convs.length) return of([]);

        return combineLatest(convs.map((c) => this.withOtherUser(c, uid)));
      }),
    );
  }

  getConversationWithUser(conversationId: string, uid: string): Observable<Conversation | null> {
    return this.getConversation(conversationId).pipe(
      switchMap((conv) => {
        if (!conv) return of(null);
        return this.withOtherUser(conv, uid);
      }),
      catchError(() => of(null)),
    );
  }

  updateConversation(conversationId: string, data: any): Observable<any> {
    const convRef = doc(this.firestore, `conversations/${conversationId}`);
    return from(updateDoc(convRef, data));
  }

  resetUnreadCount(conversationId: string): Observable<any> {
    const convRef = doc(this.firestore, `conversations/${conversationId}`);
    return from(updateDoc(convRef, { unreadCount: 0 }));
  }

  createNewConversation(otherUid: string): Observable<{ id: string }> {
    const uid = this.auth.currentUser?.uid!;

    if (!uid) {
      throw new Error('User not authenticated');
    }

    const ref = collection(this.firestore, 'conversations');

    return this.getUserConversations().pipe(
      take(1),
      switchMap((conversations) => {
        const existing = conversations.find(
          (c) =>
            c.participants.length === 2 &&
            c.participants.includes(uid) &&
            c.participants.includes(otherUid),
        );

        if (existing) {
          return of({ id: existing.id });
        }

        return from(
          addDoc(ref, {
            participants: [uid, otherUid],
            lastMessage: null,
            lastMessageTime: null,
            lastMessageSenderId: null,
            unreadCount: 0,
            createdAt: serverTimestamp(),
          }),
        ).pipe(map((docRef) => ({ id: docRef.id })));
      }),
    );
  }
}
