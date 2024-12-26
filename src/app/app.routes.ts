import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreditFormComponent } from './components/credit-form/credit-form.component';
import { NotfoundPageComponent } from './components/notfound-page/notfound-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'credit-form', component: CreditFormComponent },
    { path: '', redirectTo: 'credit-form', pathMatch: 'full' },
  {path: '**', component:NotfoundPageComponent}
];
 