import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DeleteAccountResponse, LoginResponse, ResetPasswordResponse, User } from '../../shared/models/User';
import { USER_URL } from '../../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(savedUser ? JSON.parse(savedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${USER_URL}login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  signup(name: string, firstname: string, email: string, password: string, phone: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${USER_URL}signup`, { name, firstname, email, phone, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  deleteAccount(userId: number): Observable<DeleteAccountResponse> {
    return this.http.delete<DeleteAccountResponse>(`${USER_URL}${userId}`).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      })
    );
  }

  resetPassword(email: string, newPassword: string): Observable<ResetPasswordResponse> {
    return this.http.patch<ResetPasswordResponse>(`${USER_URL}reset-password`, { email, newPassword });
  }

  getCurrentUser(): User | null {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  }
}