import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PRODUCTS_URL, PRODUCT_BY_ID_URL, PRODUCT_BY_SEARCH_URL } from '../../shared/constants/urls';
import { ApiResponse, OtherResponse, Product } from '../../shared/models/Product';

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

  getProductBySearchTerm(title: string): Observable<Product[]> {
    console.log(`Request URL: ${PRODUCT_BY_SEARCH_URL}${title}`);
    return this.http.get<ApiResponse>(`${PRODUCT_BY_SEARCH_URL}${title}`).pipe(
      map(response => response.data)
    );
  }

}
