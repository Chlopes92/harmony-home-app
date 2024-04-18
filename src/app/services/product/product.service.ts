import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse, OtherResponse, Product } from '../../shared/models/Product';
import { PRODUCTS_URL, PRODUCT_BY_ID_URL } from '../../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductsBySubCatgories(subCategorieId: number): Observable<Product[]> {
    return this.http.get<ApiResponse>(`${PRODUCTS_URL}${subCategorieId}`).pipe(
      map(respone => respone.data)
    );
  }

  getProductById(productId: number){
    return this.http.get<OtherResponse>(`${PRODUCT_BY_ID_URL}${productId}`).pipe(
      map(response => response.data as Product)
    );
  }

  // getAllProductBySearchTerm(searchTerm: string){
  //   return this.getAll().filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  // }

}
