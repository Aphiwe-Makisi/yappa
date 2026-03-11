import { Timestamp } from '@angular/fire/firestore';

export interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: { seconds: number; nanoseconds: number } | Timestamp | null;
  read: boolean;
  conversationId: string;
}
