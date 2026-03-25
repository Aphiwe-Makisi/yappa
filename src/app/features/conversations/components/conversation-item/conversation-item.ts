import { Component, inject, Input } from '@angular/core';
import { Conversation } from '../../models/conversation';
import { CommonModule } from '@angular/common';
import { Avatar } from '../../../../shared/components/avatar/avatar';
import { Router } from '@angular/router';
import { ChatDatePipe } from '../../../../shared/pipes/chat-dat.pipe';

@Component({
  selector: 'app-conversation-item',
  imports: [CommonModule, Avatar, ChatDatePipe],
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
