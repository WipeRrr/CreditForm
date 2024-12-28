import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { passwordMismatchValidator } from '../../shared/password-mismatch.directive';
import { AuthService } from '../../services/auth.service';
import { RegisterPostData } from '../../interface/auth';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private registerService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  registerForm = new FormGroup(
    {
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z]).{6,}$'),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: passwordMismatchValidator,
    }
  );

  onRegister() {
    const PostData = { ...this.registerForm.value };
    delete PostData.confirmPassword;
    const email = PostData.email ?? '';
    this.registerService.registerUser(PostData as RegisterPostData).subscribe({
      next: (response) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Yooohoo!',
          detail: 'Register successfully',
        });
        sessionStorage.setItem('email', email);
        this.router.navigate(['credit-form']);
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
        });
      },
    });
  }

  get fullName() {
    return this.registerForm.controls['fullName'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
}
