export function handleFirebaseAuthError(code: string): string {
  const errors: { [key: string]: string } = {
    // sign up
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    // sign in
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/wrong-password': 'Incorrect password, please try again.',
    'auth/user-not-found': 'No account found with this email.',
    // shared
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/popup-closed-by-user': 'Sign in was cancelled.',
  };

  return errors[code] ?? 'Something went wrong. Please try again.';
}
