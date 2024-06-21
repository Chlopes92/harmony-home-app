import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DeleteAccountResponse, LoginResponse, User } from '../../shared/models/User';
import { USER_URL } from '../../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${USER_URL}login`, { email, password }).pipe(
      tap(response => {
        this.currentUserSubject.next(response.user);
      })
    );
  }

  signup(name: string, firstname: string, email: string, password: string, phone: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${USER_URL}signup`, { name, firstname, email, phone, password }).pipe(
      tap(response => {
        this.currentUserSubject.next(response.user);
      })
    );
  }

  // newPassword(email: string, newPassword: string): Observable<NewPasswordResponse> {
  //   return this.http.patch<NewPasswordResponse>(`${USER_URL}`, { email, newPassword });
  // }

  supprimerCompte(userId: number): Observable<DeleteAccountResponse> {
    return this.http.delete<DeleteAccountResponse>(`${USER_URL}${userId}`);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

}
