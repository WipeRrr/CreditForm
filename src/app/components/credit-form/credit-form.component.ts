import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-credit-form',
  imports: [ButtonModule,  CardModule,
      ButtonModule,],
  templateUrl: './credit-form.component.html',
  styleUrl: './credit-form.component.scss'
})
export class CreditFormComponent {
  private router = inject(Router);

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login'])
  }
}
