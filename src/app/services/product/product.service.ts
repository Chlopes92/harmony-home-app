import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { PRODUCTS } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getAll(): Product[] {
    return PRODUCTS;
  }

  getAllProductBySearchTerm(searchTerm: string){
    return this.getAll().filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  
  getProductById(productId:string): Product{
    return this.getAll().find(product => product.id == productId) ?? new Product();
  }

   getProductsBySubCategoryId(subCategoryId: string): Product[] {
    return PRODUCTS.filter(product => 
      console.log(product.subCategory_id))
      // product.subCategory_id.some(subCategoryId => subCategoryId.id === subCategoryId));
  }

}
