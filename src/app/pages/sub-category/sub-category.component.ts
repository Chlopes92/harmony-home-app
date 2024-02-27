import { Component } from '@angular/core';
import { NavCategoryComponent } from '../../components/nav-category/nav-category.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NavCategoryComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

}
