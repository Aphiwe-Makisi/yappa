import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ConversationItem } from '../../components/conversation-item/conversation-item';
import { Conversation } from '../../../../core/models/conversation';
import { BottomNavigation } from '../../../../shared/components/bottom-navigation/bottom-navigation';
import { AuthService } from '../../../../core/services/auth';
import { ChatsService } from '../../services/chats';

@Component({
  selector: 'app-conversation-list',
  imports: [CommonModule, ButtonModule, OrderListModule, ConversationItem, BottomNavigation],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.css',
})
export class ConversationList {
  chatsService: ChatsService = inject(ChatsService);
  conversations$ = this.chatsService.getUserConversations();
}
