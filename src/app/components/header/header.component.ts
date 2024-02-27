import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  products: Product[] = [];

  constructor(private productService:ProductService, activatedRoute:ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm'])
      this.products = this.productService.getAllProductBySearchTerm(params['searchTerm']);
      else
      this.products = productService.getAll();
    });
  }

}
