import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/authService/auth.service';


export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('password_confirmation')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signupForm: FormGroup;
  backendErrors: { [key: string]: string[] } | null = null;



  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.minLength(6), Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validator: passwordMatchValidator } // Apply custom validator to the group
    );
  }


  // getControl(name: string): AbstractControl | null {
  //   return this.signupForm.get(name);
  // }

  // getControlErrors(name: string): ValidationErrors | null {
  //   return this.getControl(name)?.errors ?? null;
  // }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get passwordConfirmation() {
    return this.signupForm.get('password_confirmation');
  }

  register(): void {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.signupForm.reset();
          this.backendErrors = null;
        },
        error: (error) => {
          console.error('Registration failed:', error);
          if (error.status === 422) {
            this.backendErrors = error.error.errors;
          }
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
