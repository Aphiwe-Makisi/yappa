import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-conversation-view',
  imports: [ButtonModule],
  templateUrl: './conversation-view.html',
  styleUrl: './conversation-view.css',
})
export class ConversationView {
  router: Router = inject(Router);

  back(): void {
    this.router.navigateByUrl('/');
  }
}
