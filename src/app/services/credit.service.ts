import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditForm } from '../interface/credit';

@Injectable({
  providedIn: 'root',
})
export class CreditService{
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:3000';

  sendCreditForm(userData: CreditForm): Observable<CreditForm> {
    return this.http.post<CreditForm>(`${this.baseUrl}/credits/`, userData);
  }
}
