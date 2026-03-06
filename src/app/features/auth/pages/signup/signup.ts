import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth';
import { sanitisedUserInput } from '../../../../shared/utils';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { handleFirebaseAuthError } from '../../../../shared/firebase-errors';
import { RouterLink } from '@angular/router';
import { User } from '@angular/fire/auth';
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
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  form!: FormGroup;
  errorMessage: string = '';

  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      full_name: [''],
      email: [''],
      password: [''],
      confirm_password: [''],
    });
  }

  register(): any {
    const fullname = sanitisedUserInput(this.form.get('full_name')?.value);
    const email = sanitisedUserInput(this.form.get('email')?.value);
    const password = sanitisedUserInput(this.form.get('password')?.value);
    this.authService
      .signUp(email, password)
      .then((res: any) => {
        console.log(res.user);
      })
      .catch((error: any) => {
        this.errorMessage = handleFirebaseAuthError(error.code);
      });
  }
}
