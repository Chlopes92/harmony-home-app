import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../services/product/product.service';
import { Cart } from '../../shared/models/Cart';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  products: Product[] = [];
  cart!: Cart;

  constructor(private productService:ProductService, activatedRoute:ActivatedRoute, private cartService:CartService) {
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm'])
      this.products = this.productService.getAllProductBySearchTerm(params['searchTerm']);
      else
      this.products = productService.getAll();
    });

    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

}
