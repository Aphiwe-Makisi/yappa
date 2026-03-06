import { Component, inject } from '@angular/core';
import { Logo } from '../../../../shared/components/logo/logo';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { getFieldError } from '../../../../shared/utils';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';

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

  login() {}
}
