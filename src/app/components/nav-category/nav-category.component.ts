import { Component } from '@angular/core';
import { Category } from '../../shared/models/Category';
import { CategoryService } from '../../services/category/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-category.component.html',
  styleUrl: './nav-category.component.css'
})
export class NavCategoryComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
    this.categories = categoryService.getAll();
  }

}
