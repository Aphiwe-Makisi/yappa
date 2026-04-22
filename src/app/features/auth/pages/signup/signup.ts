import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth';
import { getFieldError, sanitisedUserInput } from '../../../../shared/utils';
import { handleFirebaseAuthError } from '../../../../shared/firebase-errors';
import { Router, RouterLink } from '@angular/router';
import { Logo } from '../../../../shared/components/logo/logo';
import { IonButton, IonContent, IonInput, IonItem, IonSpinner } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    Logo,
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonSpinner
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  form!: FormGroup;
  errorMessage: string = '';
  getFieldError = getFieldError;

  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register(): Promise<void> {
    const fullname = sanitisedUserInput(this.form.value.full_name);
    const email = sanitisedUserInput(this.form.value.email);
    const password = sanitisedUserInput(this.form.value.password);
    const confirmPassword = sanitisedUserInput(this.form.value.confirm_password);

    if (!this.comparePasswords(password, confirmPassword)) {
      this.errorMessage = "Passwords don't match";
      return;
    }

    try {
      await this.authService.signUp(email, password, fullname);

      await firstValueFrom(this.authService.signOut());

      this.continueToLogin();

    } catch (error: any) {
      this.errorMessage = handleFirebaseAuthError(error.code);
    }
  }

  comparePasswords(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  continueToLogin(): void {
    this.form.reset();
    this.router.navigateByUrl('/auth/login');
  }
}
