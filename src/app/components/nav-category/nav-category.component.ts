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
  styleUrl: './nav-category.component.css'
})
export class NavCategoryComponent implements OnInit{
  categories: Category[] = [];
  activeCategoryId!: string;

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      console.log('category: ', data);
      this.categories = data;
    })

    this.activatedRoute.params.subscribe(params => {
      this.activeCategoryId = params['id']; 
    });
  }

  isActiveCategory(categoryId: string): boolean {
    return this.activeCategoryId === categoryId;
  }

  slugRoute(categoryName: string): string {
    const slug = categoryName.replace(/ /g, '-').toLowerCase();
    return `/category/${slug}`;
  }

}
