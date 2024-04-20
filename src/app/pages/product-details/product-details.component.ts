import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  product!: Product;

  constructor(
    public activatedRoute: ActivatedRoute, 
    private productService:ProductService, 
    private cartService:CartService, 
    private router:Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(id) {
        this.productService.getProductById(id).subscribe(product => {
          this.product = product;
          console.log(this.product);
        });
      }
    });
    this.addToCart();
  }
  
  addToCart(){
    this.cartService.addToCart(this.product);
    this.router.navigateByUrl('/cart');
  }

}
