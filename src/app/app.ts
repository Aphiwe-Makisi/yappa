import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingOverlay } from './shared/components/loading-overlay/loading-overlay';
import { AuthService } from './core/services/auth';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingOverlay],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('yappa');
  authService: AuthService = inject(AuthService);
  authState$ = this.authService.currentUser$;

  ngOnInit(): void {
    this.authState$.subscribe((data) => data?.reload());
  }
}
