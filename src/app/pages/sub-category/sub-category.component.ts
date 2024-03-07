import { Component, OnInit } from '@angular/core';
import { NavCategoryComponent } from '../../components/nav-category/nav-category.component';
import { Category } from '../../shared/models/Category';
import { CategoryService } from '../../services/category/category.service';
import { SubCategory } from '../../shared/models/SubCategory';
import { SubCategoryService } from '../../services/sub-category/sub-category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NavCategoryComponent, RouterLink],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent implements OnInit{
  categories: Category[] = [];
  subCategories: SubCategory[] = [];

  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService, public activatedRoute: ActivatedRoute) {
    this.categories = categoryService.getAll();
    // this.subCategories = subCategoryService.getAll();
    // console.log(this.subCategories);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      // Utilisez '1' comme valeur par défaut si 'id' n'est pas présent dans les paramètres
      const categoryId = params['id'] || '1'; // Assurez-vous que '1' est bien l'ID de votre première catégorie
      this.subCategories = this.subCategoryService.getSubCategoryByCategoryId(categoryId);
    });
}


}
