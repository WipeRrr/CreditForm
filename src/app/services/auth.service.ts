import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser, User } from '../interface/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  registerUser(userData: RegisterUser) {
    return this.http.post(`${this.baseUrl}/users`, userData);
  }

  getUserDetails(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }
}
