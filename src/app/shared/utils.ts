import { AbstractControl } from '@angular/forms';
import { UserProfile } from '../core/models/user-profile';

export function sanitisedUserInput(input: string): string {
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

export function getFieldError(control: AbstractControl | null): string {
  if (!control || !control.invalid || !control.touched) return '';

  if (control.hasError('required')) return 'This field is required';
  if (control.hasError('email')) return 'Please enter a valid email';
  if (control.hasError('minlength')) {
    const min = control.getError('minlength').requiredLength;
    return `Must be at least ${min} characters`;
  }
  if (control.hasError('maxlength')) {
    const max = control.getError('maxlength').requiredLength;
    return `Must be no more than ${max} characters`;
  }

  return 'Invalid field';
}

export function displayInitials(userProfile: UserProfile): string {
  if (!userProfile || !userProfile.displayName) return '';
  const name = userProfile.displayName;
  const splitName = name.trim().split(' ');
  if (splitName.length === 1) return splitName[0][0].toUpperCase();
  return `${splitName[0][0]}${splitName[1][0]}`.toUpperCase();
}
