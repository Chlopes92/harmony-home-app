import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../shared/models/User';
import { USER_URL } from '../../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${USER_URL}login`, { email, password });
  }

  signup(name: string, firstname: string, email: string, password: string, phone: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${USER_URL}signup`, { name, firstname, email, phone, password });
  }
}
