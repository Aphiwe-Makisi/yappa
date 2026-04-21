import { Component, Input } from '@angular/core';
import { displayInitials } from '../../utils';
import { UserProfile } from '../../../core/models/user-profile';
import { IonAvatar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-avatar',
  imports: [IonAvatar],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
  @Input() userProfile!: UserProfile | null | undefined;

  displayName(): string {
    return displayInitials(this.userProfile!);
  }
}
