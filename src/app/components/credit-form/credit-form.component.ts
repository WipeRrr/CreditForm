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
  // file: File | null = null;
  monthsList = Array.from({ length: 36 }, (_, i) => ({
    name: `${i + 1} months`,
    value: i + 1, //
  }));

  // onFileSelect(event: any) {
  //   this.creditForm.controls['file'].setValue(event.files);
  // }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  creditForm = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    months: new FormControl(1, [Validators.required]),
    file: new FormControl(null, [Validators.required]),
  });

  onSubmit() {
    console.log(this.creditForm.value);
  }

  // get months() {
  //   return this.creditForm.controls['months'];
  // }
}
