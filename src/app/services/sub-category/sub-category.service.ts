import { Injectable } from '@angular/core';
import { SubCategory } from '../../shared/models/SubCategory';
import { SUB_CATEGORIES } from '../../data';
import { Category } from '../../shared/models/Category';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor() { }
  
  getAll(): SubCategory[] {
    return SUB_CATEGORIES;
  }

  // getSubCategoryById(subCategoryId: string): SubCategory[]{
  //   return SUB_CATEGORIES.filter(SubCategory => SubCategory.id === subCategoryId);
  // }

  getSubCategoryById(categoryId: string): SubCategory[] {
    return SUB_CATEGORIES.filter(subCategory =>
      subCategory.categories_id.some(category => category.id === categoryId)
    );
  }
  
  
}
