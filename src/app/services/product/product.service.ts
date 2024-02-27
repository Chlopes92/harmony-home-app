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
}
