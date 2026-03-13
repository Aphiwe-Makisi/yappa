import { Component, input } from '@angular/core';
import { Message } from '../../models/message';
import { FirestoreDatePipe } from '../../../../shared/pipes/firestore-date.pipe';
import { CommonModule } from '@angular/common';
import { Conversation } from '../../models/conversation';

@Component({
  selector: 'app-message-bubble',
  imports: [CommonModule, FirestoreDatePipe],
  templateUrl: './message-bubble.html',
  styleUrl: './message-bubble.css',
})
export class MessageBubble {
  message = input<Message>();
  conversation = input<Conversation>();
}
