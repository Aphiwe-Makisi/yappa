import { Timestamp } from '@angular/fire/firestore';
import { UserProfile } from './user-profile';

export interface Conversation {
  id: string;
  displayName: string;
  avatar: string | null;
  participants: string[];
  lastMessage: string;
  lastMessageTime: { seconds: number; nanoseconds: number } | Timestamp | null;
  unreadCount: number;
  isOnline: boolean;
  otherUser?: UserProfile | null;
}
