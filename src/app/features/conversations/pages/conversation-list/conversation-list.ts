import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { ConversationItem } from '../../components/conversation-item/conversation-item';
import { Conversation } from '../../../../core/models/conversation';
import { BottomNavigation } from '../../../../shared/components/bottom-navigation/bottom-navigation';

@Component({
  selector: 'app-conversation-list',
  imports: [CommonModule, ButtonModule, OrderListModule, ConversationItem, BottomNavigation],
  templateUrl: './conversation-list.html',
  styleUrl: './conversation-list.css',
})
export class ConversationList {
  conversations = signal<Conversation[]>([
    {
      id: '1',
      displayName: 'Dr Smith',
      avatar: 'assets/avatar1.png',
      lastMessage: 'Your test results are ready.',
      lastMessageTime: '10:45',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      displayName: 'Reception',
      avatar: '',
      lastMessage: 'Appointment confirmed.',
      lastMessageTime: '09:30',
      unreadCount: 85,
      isOnline: true,
    },
    {
      id: '3',
      displayName: 'Dr Patel',
      avatar: 'assets/avatar3.png',
      lastMessage: 'Please take the medication twice daily.',
      lastMessageTime: '08:15',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '4',
      displayName: 'Nurse Joy',
      avatar: '',
      lastMessage: 'Your blood pressure looks good!',
      lastMessageTime: 'Yesterday',
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: '5',
      displayName: 'Dr Nkosi',
      avatar: 'assets/avatar5.png',
      lastMessage: 'Follow up next week.',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '6',
      displayName: 'Pharmacy',
      avatar: '',
      lastMessage: 'Your prescription is ready for collection.',
      lastMessageTime: 'Mon',
      unreadCount: 3,
      isOnline: false,
    },
    {
      id: '7',
      displayName: 'Dr Williams',
      avatar: 'assets/avatar7.png',
      lastMessage: 'I have reviewed your scans.',
      lastMessageTime: 'Mon',
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: '8',
      displayName: 'Billing',
      avatar: '',
      lastMessage: 'Invoice #1042 has been sent.',
      lastMessageTime: 'Sun',
      unreadCount: 7,
      isOnline: false,
    },
    {
      id: '9',
      displayName: 'Dr Okonkwo',
      avatar: 'assets/avatar9.png',
      lastMessage: 'See you at your next check-up.',
      lastMessageTime: 'Sat',
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: '10',
      displayName: 'Support',
      avatar: '',
      lastMessage: 'How can we help you today?',
      lastMessageTime: 'Fri',
      unreadCount: 12,
      isOnline: false,
    },
  ]);
}
