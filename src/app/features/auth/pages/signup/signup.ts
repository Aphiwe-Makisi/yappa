import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth';
import { sanitisedUserInput } from '../../../../shared/utils';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { handleFirebaseAuthError } from '../../../../shared/firebase-errors';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, IftaLabelModule, ButtonModule],
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
      email: [''],
      password: [''],
    });
  }

  register(): any {
    const email = sanitisedUserInput(this.form.get('email')?.value);
    const password = sanitisedUserInput(this.form.get('password')?.value);
    this.authService
      .signUp(email, password)
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => {
        this.errorMessage = handleFirebaseAuthError(error.code);
      });
  }
}
