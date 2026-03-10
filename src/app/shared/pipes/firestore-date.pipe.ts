import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({ name: 'firestoreDate', standalone: true })
export class FirestoreDatePipe implements PipeTransform {
  transform(value: { seconds: number; nanoseconds: number } | Timestamp | null): Date | null {
    if (!value) return null;
    if (value instanceof Timestamp) return value.toDate();
    return new Date(value.seconds * 1000);
  }
}
