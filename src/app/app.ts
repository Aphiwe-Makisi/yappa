import { Component, inject, signal } from '@angular/core';
import { AuthService } from './core/services/auth';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet],
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
