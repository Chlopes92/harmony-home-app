import { Component } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product!: Product;

  constructor(activatedRoute: ActivatedRoute, productService:ProductService,
    private cartService:CartService, private router:Router){
      activatedRoute.params.subscribe((params) => {
        if(params['id'])
        this.product = productService.getProductById(params['id']);
      });
  }
  
  addToCart(){
    this.cartService.addToCart(this.product);
    this.router.navigateByUrl('/cart');
  }

}
