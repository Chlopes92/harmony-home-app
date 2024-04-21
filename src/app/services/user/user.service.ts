import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../shared/models/User';
import { LOGIN_URL } from '../../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${LOGIN_URL}`, { email, password });
  }
}
