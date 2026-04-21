import { Component, inject, Input } from '@angular/core';
import { Conversation } from '../../models/conversation';
import { CommonModule } from '@angular/common';
import { Avatar } from '../../../../shared/components/avatar/avatar';
import { Router } from '@angular/router';
import { ChatDatePipe } from '../../../../shared/pipes/chat-dat.pipe';
import { IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-conversation-item',
  imports: [CommonModule, Avatar, ChatDatePipe, IonLabel, IonItem],
  templateUrl: './conversation-item.html',
  styleUrl: './conversation-item.css',
})
export class ConversationItem {
  @Input() conversation!: Conversation;

  router: Router = inject(Router);

  openConversation(): void {
    this.router.navigate(['/conversations', this.conversation.id]);
  }
}
