import { Component, inject } from '@angular/core';
import { UserService } from '../../../../core/services/user';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth';
import { switchMap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-conversation',
  imports: [CommonModule, ButtonModule],
  templateUrl: './new-conversation.html',
  styleUrl: './new-conversation.css',
  standalone: true,
})
export class NewConversation {
  userService: UserService = inject(UserService);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  users$ = this.authService.uid$.pipe(switchMap((uid) => this.userService.getAllUsers(uid ?? '')));

  back(): void {
    this.router.navigateByUrl('/');
  }
}
