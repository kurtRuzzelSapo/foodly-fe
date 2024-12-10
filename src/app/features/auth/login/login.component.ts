import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/authService/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NgClass, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  backendErrors: { [key: string]: string[] } | null = null;


  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
    );
  }


  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          const role:string = response.user.role;
          const token = response.access_token;
          console.log('Login successful:', response);
          this.loginForm.reset();
          this.backendErrors = null;
          this.authService.UserOrAdmin(role)
          this.authService.setLoginData(token,role)

        },
        error: (error) => {
          console.error('Login failed:', error);
          if (error.status === 422) {
            this.backendErrors = error.error.errors; // Validation errors
          } else if (error.error && error.error.error) {
            // Handle general errors like "Invalid credentials"
            this.backendErrors = { general: [error.error.error] };
          }
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}


