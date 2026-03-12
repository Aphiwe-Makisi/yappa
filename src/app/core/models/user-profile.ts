export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  username?: string;
  bio?: string;
  photoURL?: string;
  isOnline?: boolean;
  lastSeen?: any;
  createdAt?: any;
}
