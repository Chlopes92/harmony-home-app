import { Component, OnInit } from '@angular/core';
import { NavCategoryComponent } from '../../components/nav-category/nav-category.component';
import { Category } from '../../shared/models/Category';
import { CategoryService } from '../../services/category/category.service';
import { SubCategory } from '../../shared/models/SubCategory';
import { SubCategoryService } from '../../services/sub-category/sub-category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NavCategoryComponent],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent implements OnInit{
  categories: Category[] = [];
  subCategories: SubCategory[] = [];

  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService, public activatedRoute: ActivatedRoute) {
    this.categories = categoryService.getAll();
    this.subCategories = subCategoryService.getAll();
    console.log(this.subCategories);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const categoryId = params['id']; // Assurez-vous que le nom de paramètre correspond à la définition de votre route
      this.subCategories = this.subCategoryService.getSubCategoryById(categoryId);
    });
}


}
