import { Injectable } from '@angular/core';
import { Category } from '../../shared/models/Category';
import { CATEGORIES } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getAll(): Category[] {
    return CATEGORIES;
  }

  // getCategoryById(categoryId:string):Category[]{
  //   return CATEGORIES.filter(category => category.id.includes(categoryId)); 

  // }
}
