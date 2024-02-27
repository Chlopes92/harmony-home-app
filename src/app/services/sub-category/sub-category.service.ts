import { Injectable } from '@angular/core';
import { SubCategory } from '../../shared/models/SubCategory';
import { SUB_CATEGORIES } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor() { }
  
  getAll(): SubCategory[] {
    return SUB_CATEGORIES;
  }

  getByCategoryId(categoryId: string): SubCategory[] {
    return SUB_CATEGORIES.filter(subCategory => subCategory.categories_id.includes(categoryId));
  }
}
