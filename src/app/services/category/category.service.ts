import { Injectable } from '@angular/core';
import { ApiResponse, Category } from '../../shared/models/Category';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CATEGORY_URL } from '../../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<ApiResponse>(CATEGORY_URL).pipe(
      map(response => response.data)
    );
  }

  getCategoryByName(name: string): Observable<Category[]>{
    return this.http.get<ApiResponse>(`${CATEGORY_URL}${name}`).pipe(
      map(response => response.data)
    );

  }
}
