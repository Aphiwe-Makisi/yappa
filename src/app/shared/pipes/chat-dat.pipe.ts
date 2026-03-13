import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { formatDistanceToNow, isToday, isYesterday, format } from 'date-fns';

@Pipe({ name: 'chatDate', standalone: true })
export class ChatDatePipe implements PipeTransform {
  transform(value: { seconds: number; nanoseconds: number } | Timestamp | null): string {
    if (!value) return '';
    const date = value instanceof Timestamp ? value.toDate() : new Date(value.seconds * 1000);

    if (isToday(date)) return format(date, 'HH:mm');
    if (isYesterday(date)) return `Yesterday ${format(date, 'HH:mm')}`;
    return format(date, 'dd/MM/yyyy HH:mm');
  }
}
