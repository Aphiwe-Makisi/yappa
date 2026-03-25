import { Component, inject } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth';
import { getFieldError, sanitisedUserInput } from '../../../../shared/utils';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { handleFirebaseAuthError } from '../../../../shared/firebase-errors';
import { Router, RouterLink } from '@angular/router';
import { Logo } from '../../../../shared/components/logo/logo';
@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    IftaLabelModule,
    ButtonModule,
    FormsModule,
    RouterLink,
    Logo,
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

  register(): void {
    const fullname = sanitisedUserInput(this.form.get('full_name')?.value);
    const email = sanitisedUserInput(this.form.get('email')?.value);
    const password = sanitisedUserInput(this.form.get('password')?.value);
    const confirmPassword = sanitisedUserInput(this.form.get('confirm_password')?.value);

    const match = this.comparePasswords(password, confirmPassword);

    if (!match) {
      this.errorMessage = "Passwords don't match";
      return;
    }

    this.authService
      .signUp(email, password)
      .then(() => {
        this.authService.signOut().subscribe({
          next: () => {
            this.continueToLogin();
          },
          error: (err) => {
            console.error(err);
          },
        });
      })
      .catch((error: any) => {
        this.errorMessage = handleFirebaseAuthError(error.code);
      });
  }

  comparePasswords(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

  continueToLogin(): void {
    this.router.navigateByUrl('/auth/login');
  }
}
