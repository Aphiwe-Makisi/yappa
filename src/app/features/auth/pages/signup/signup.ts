import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  form!: FormGroup;

  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);

  initForm(): void {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  login(): any {
    const email = this.sanitisedUserInput(this.form.get('email')?.value);
    const password = this.sanitisedUserInput(this.form.get('password')?.value);
    this.authService
      .signUp(email, password)
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  sanitisedUserInput(input: string): string {
    if (!input) return '';

    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
      '`': '&#x60;',
    };

    return input.replace(/[&<>"'`]/g, (char) => map[char]);
  }
}
