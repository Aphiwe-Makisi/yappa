import { Component, Input } from '@angular/core';
import { Conversation } from '../../../core/models/conversation';
import { displayInitials } from '../../utils';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
  @Input() conversation!: Conversation;

  displayName(name: string): string {
    return displayInitials(name);
  }
}
