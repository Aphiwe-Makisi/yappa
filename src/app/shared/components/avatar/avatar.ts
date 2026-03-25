import { Component, Input } from '@angular/core';
import { Conversation } from '../../../features/conversations/models/conversation';
import { displayInitials } from '../../utils';
import { UserProfile } from '../../../core/models/user-profile';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
  @Input() userProfile!: UserProfile | null | undefined;

  ngOnInit() {
    console.log(this.userProfile);
  }

  displayName(): string {
    return displayInitials(this.userProfile!);
  }
}
