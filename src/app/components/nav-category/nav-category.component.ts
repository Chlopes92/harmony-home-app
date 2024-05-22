import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/models/Category';
import { CategoryService } from '../../services/category/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-category',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-category.component.html',
  styleUrls: ['./nav-category.component.css']
})
export class NavCategoryComponent implements OnInit {
  categories: Category[] = [];
  activeCategoryId!: string;

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      console.log('category: ', data);
      this.categories = data;

      // Ajoutez ceci pour appliquer la catégorie active par défaut après le chargement des catégories
      const storedCategoryId = localStorage.getItem('activeCategory');
      if (storedCategoryId && this.categories.some(category => category.id === storedCategoryId)) {
        this.activeCategoryId = storedCategoryId;
      } else if (this.categories.length > 0) {
        this.activeCategoryId = this.categories[0].id; // Sélectionner la première catégorie si aucune catégorie active n'est trouvée
      }
    });
  }

  isActiveCategory(categoryId: string): boolean {
    return this.activeCategoryId === categoryId;
  }

  onCategoryClick(categoryId: string): void {
    localStorage.setItem('activeCategory', categoryId);
    this.activeCategoryId = categoryId;
  }

  slugRoute(categoryName: string): string {
    const slug = categoryName.replace(/ /g, '-').toLowerCase();
    return `/category/${slug}`;
  }
}
