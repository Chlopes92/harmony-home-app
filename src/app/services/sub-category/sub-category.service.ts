import { Injectable } from '@angular/core';
import { ApiResponse, SubCategory } from '../../shared/models/SubCategory';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SUB_CATEGORY_URL } from '../../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private http: HttpClient) { }

  getSubCategories(categoryId: number): Observable<SubCategory[]>{
    return this.http.get<ApiResponse>(`${SUB_CATEGORY_URL}${categoryId}`).pipe(
      map(response => response.data)
    );
  }
  
}
