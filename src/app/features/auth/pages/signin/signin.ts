import { Component, inject } from '@angular/core';
import { Logo } from '../../../../shared/components/logo/logo';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { getFieldError, sanitisedUserInput } from '../../../../shared/utils';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { UserService } from '../../../../core/services/user';
import { handleFirebaseAuthError } from '../../../../shared/firebase-errors';
import { User } from '@angular/fire/auth';
import { serverTimestamp } from '@angular/fire/firestore';
import { UserProfile } from '../../../../core/models/user-profile';

@Component({
  selector: 'app-signin',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Logo,
    IftaLabelModule,
    ButtonModule,
    InputTextModule,
    RouterLink,
  ],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
  standalone: true,
})
export class Signin {
  form!: FormGroup;
  errorMessage: string = '';
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);
  router: Router = inject(Router);

  getFieldError = getFieldError;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const email = sanitisedUserInput(this.form.get('email')?.value);
    const password = sanitisedUserInput(this.form.get('password')?.value);
    this.authService
      .signIn(email, password)
      .then((res: any) => {
        this.continueToApp(res.user);
      })
      .catch((error: any) => {
        this.errorMessage = handleFirebaseAuthError(error.code);
      });
  }

  continueToApp(user: User): void {
    const data = this.buildUserData(user);
    this.userService
      .ensureUserExists(user, data)
      .then(() => {
        this.router.navigateByUrl('/auth/conversations');
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  buildUserData(user: User): UserProfile {
    return {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? '',
      createdAt: serverTimestamp(),
    };
  }
}
