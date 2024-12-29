import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { sendCreditForm } from '../../interface/auth';
@Component({
  selector: 'app-credit-form',
  imports: [
    ButtonModule,
    CardModule,
    ButtonModule,
    InputNumberModule,
    ReactiveFormsModule,
    SelectModule,
    FileUploadModule,
  ],
  templateUrl: './credit-form.component.html',
  styleUrl: './credit-form.component.scss',
})
export class CreditFormComponent {
  private router = inject(Router);
  private messageService = inject(MessageService);
  private registerService = inject(AuthService);
  file: File | null = null;
  monthsList = Array.from({ length: 36 }, (_, i) => ({
    name: `${i + 1} months`,
    value: i + 1,
  }));

  onFileSelect(event: any) {
    const files = event.currentFiles; // Используем правильное свойство

    if (files && files.length > 0) {
      this.creditForm.controls['file'].setValue(files);
      console.log(files);// Устанавливаем массив файлов в форму
    } else {
      console.warn('No files selected!');
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  creditForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    months: new FormControl(1, [Validators.required]),
    file: new FormControl([], [Validators.required]),
  });

  onSubmit() {
    const id = sessionStorage.getItem('id');
    const email = sessionStorage.getItem('email');
     if (!id || !email) {
       console.error('Missing user data in sessionStorage');
       return; // Прекращаем выполнение, если данных нет
     }
   const postData: sendCreditForm = {
     id, // id пользователя
     email, // email пользователя
     file: this.creditForm.value.file, // файл из формы
     months: this.creditForm.value.months?.toString() || '', // месяцы в строковом формате
     amount: parseFloat(this.creditForm.value.amount?.toString() || '0'), // сумма
   };

    this.registerService.sendCreditForm(postData as sendCreditForm).subscribe({
      next: (response) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Yooohoo!',
          detail: 'Request Sended',
        });
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
}
