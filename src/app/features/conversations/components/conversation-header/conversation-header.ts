import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Avatar } from '../../../../shared/components/avatar/avatar';
import { Conversation } from '../../models/conversation';
import { ChatDatePipe } from '../../../../shared/pipes/chat-dat.pipe';

@Component({
  selector: 'app-conversation-header',
  imports: [ButtonModule, Avatar, ChatDatePipe],
  templateUrl: './conversation-header.html',
  styleUrl: './conversation-header.css',
})
export class ConversationHeader {
  private router: Router = inject(Router);

  @Input() conv!: Conversation;

  back(): void {
    this.router.navigateByUrl('/');
  }
}
