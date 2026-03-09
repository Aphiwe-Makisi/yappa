import { Component, Input } from '@angular/core';
import { Conversation } from '../../../core/models/conversation';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
  @Input() conversation!: Conversation;
}
