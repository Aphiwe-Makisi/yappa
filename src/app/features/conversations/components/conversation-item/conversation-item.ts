import { Component, Input } from '@angular/core';
import { Conversation } from '../../../../core/models/conversation';
import { CommonModule } from '@angular/common';
import { Avatar } from '../../../../shared/components/avatar/avatar';

@Component({
  selector: 'app-conversation-item',
  imports: [CommonModule, Avatar],
  templateUrl: './conversation-item.html',
  styleUrl: './conversation-item.css',
})
export class ConversationItem {
  @Input() conversation!: Conversation;
}
