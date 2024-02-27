import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../shared/models/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(private productService: ProductService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm'])
      this.products = this.productService.getAllProductBySearchTerm(params['searchTerm']);
      else
      this.products = productService.getAll();
    });
  }

}
