import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login = {
    email: '',
    password: '',
  };

  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  onLogin() {
    const { email, password } = this.login;
    this.authService.getUserDetails(email).subscribe({
      next: (response) => {
        if (response.length > 0 && password === response[0].password) {
          const id = response[0]?.id;
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('id', id);
          this.router.navigate(['credit-form']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Wrong email or password',
          });
        }
      },
      error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong',
          });
      }
    });
  }
}
