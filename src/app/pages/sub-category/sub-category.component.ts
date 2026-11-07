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

  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService, public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const slug = params['slug'] || 'tous-les-produits'; // Slug de l'url
      console.log('Route params: ', params);
      // console.log('categoryService: ', this.categoryService.getCategories());
      this.categoryService.getCategories().subscribe(data => {
        console.log('data : ', data);
        data.forEach(category => {
          const categorySlug = category.name.replace(/ /g,'-').toLowerCase();
          // cosole.log(categorySlug)
          if (slug === categorySlug){
            console.log(+category.id);
            this.subCategoryService.getSubCategories(+category.id).subscribe(data => {
              this.subCategories = data;
            })
          }
        })   
      });
    });
  }
}
