import { Injectable } from '@angular/core';
import { ApiResponse, Product } from '../../shared/models/Product';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PRODUCTS_URL } from '../../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.http.get<ApiResponse>(`${PRODUCTS_URL}`).pipe(
      map(response => response.data)
    );
  }

  getProductsBySubCatgories(subCategorieId: number): Observable<Product[]> {
    return this.http.get<ApiResponse>(`${PRODUCTS_URL}${subCategorieId}`).pipe(
      map(respone => respone.data)
    );
  }

  // getAllProductBySearchTerm(searchTerm: string){
  //   return this.getAll().filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  // }
  
  // getProductById(productId:string): Product{
  //   return this.getAll().find(product => product.id == productId) ?? new Product();
  // }

}
