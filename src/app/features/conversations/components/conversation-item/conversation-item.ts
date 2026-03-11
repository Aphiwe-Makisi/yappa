import { Component, inject, Input } from '@angular/core';
import { Conversation } from '../../models/conversation';
import { CommonModule } from '@angular/common';
import { Avatar } from '../../../../shared/components/avatar/avatar';
import { FirestoreDatePipe } from '../../../../shared/pipes/firestore-date.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation-item',
  imports: [CommonModule, Avatar, FirestoreDatePipe],
  templateUrl: './conversation-item.html',
  styleUrl: './conversation-item.css',
})
export class ConversationItem {
  @Input() conversation!: Conversation;

  router: Router = inject(Router);

  openConversation(): void {
    this.router.navigateByUrl(`/conversations/${this.conversation.id}`);
  }
}
