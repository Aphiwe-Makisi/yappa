import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-conversations',
  imports: [],
  templateUrl: './no-conversations.html',
  styleUrl: './no-conversations.css',
})
export class NoConversations {
  router: Router = inject(Router);

  navigateToFriendList(): void {
    this.router.navigateByUrl('/conversations/new');
  }
}
