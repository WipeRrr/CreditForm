import { Component, inject, OnInit } from '@angular/core';
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
import { CreditForm } from '../../interface/credit';
import { CreditService } from '../../services/credit.service';
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
export class CreditFormComponent implements OnInit {
  private router = inject(Router);
  private messageService = inject(MessageService);
  private creditService = inject(CreditService);
  file: File | null = null;
  monthsList: object[] | undefined;

  ngOnInit() {
    this.monthsList = Array.from({ length: 36 }, (_, i) => ({
      name: `${i + 1} months`,
      value: `${i + 1}`,
    }));
  }

  onFileSelect(event: any) {
    const files = event.currentFiles;

    if (files.length > 0) {
      const processedFiles = files.map((file: File) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      }));

      this.creditForm.controls['file'].setValue(processedFiles);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Oops!',
        detail: 'No file selected',
      });
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  creditForm = new FormGroup({
    amount: new FormControl<number | null>(0, [Validators.required]),
    months: new FormControl<{ name: string; value: number } | null>(null, [
      Validators.required,
    ]),
    file: new FormControl<File[]>([], [Validators.required]),
  });

  onSubmit() {
    const id = sessionStorage.getItem('id');
    const email = sessionStorage.getItem('email');
    const { months, amount, file } = this.creditForm.value;

    if (!id || !email) {
      console.error('Missing user data in sessionStorage');
      return;
    }

    const selectedMonthName = months ? months.name : '';

    const userData: CreditForm = {
      id: id!,
      email: email!,
      file: file || [],
      months: selectedMonthName || '',
      amount: amount || 0,
    };

    this.creditService.sendCreditForm(userData as CreditForm).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Yooohoo!',
          detail: `Request for a credit of ${amount}$ for ${selectedMonthName} has been sent.`,
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
