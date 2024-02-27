import { Component } from '@angular/core';
import { NavCategoryComponent } from '../../components/nav-category/nav-category.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NavCategoryComponent],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class CategoryComponent {

}
