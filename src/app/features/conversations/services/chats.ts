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
} from '@angular/fire/firestore';
import { catchError, combineLatest, from, map, Observable, of, switchMap } from 'rxjs';
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

  getConversationsWithUsers(uid: string): Observable<Conversation[]> {
    return this.getUserConversations().pipe(
      switchMap((convs) => {
        if (!convs.length) return of([]);

        const streams = convs.map((conv) => {
          const otherUid = conv.participants.find((id: string) => id !== uid);
          if (!otherUid) return of({ ...conv, otherUser: null });

          return this.userService
            .getUser(otherUid)
            .pipe(map((user) => ({ ...conv, otherUser: user })));
        });

        return combineLatest(streams);
      }),
    );
  }

  getConversationWithUser(conversationId: string, uid: string): Observable<Conversation | null> {
    return this.getConversation(conversationId).pipe(
      switchMap((conv) => {
        if (!conv) return of(null);

        const otherUid = conv.participants.find((id: string) => id !== uid);
        if (!otherUid) return of({ ...conv, otherUser: null });

        return this.userService
          .getUser(otherUid)
          .pipe(map((user) => ({ ...conv, otherUser: user })));
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
}
