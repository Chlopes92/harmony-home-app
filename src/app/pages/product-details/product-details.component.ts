import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  product!: Product;
  showDimension = false;
  showFeatures = false;

  constructor(
    public activatedRoute: ActivatedRoute, 
    private productService:ProductService,
    private wishlistService: WishlistService, 
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

    // Vérifiez si un produit est en attente d'ajout à la liste de souhaits
    this.checkPendingWishlistProduct();
  }

  addToWishlist() {
    if (this.product) {
      if (this.isUserLoggedIn()) {
        this.wishlistService.addToWishlist(this.product);
        this.router.navigate(['/wishlist']); // Rediriger vers la page de la liste de souhaits
      } else {
        // Stockez le produit dans localStorage 
        localStorage.setItem('pendingWishlistProduct', JSON.stringify(this.product));
        alert('Vous devez être connecté pour ajouter un produit à la liste de souhaits.');
        this.router.navigate(['/login']); // Rediriger vers la page de connexion
      }
    }
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  private checkPendingWishlistProduct(): void {
    const pendingProduct = localStorage.getItem('pendingWishlistProduct');
    if (pendingProduct && this.isUserLoggedIn()) {
      const product: Product = JSON.parse(pendingProduct);
      this.wishlistService.addToWishlist(product);
      localStorage.removeItem('pendingWishlistProduct');
    }
  }
  
  addToCart(){
    this.cartService.addToCart(this.product);
    this.router.navigateByUrl('/cart');
  }

  toggleSection(section: string) {
    if (section === 'dimension') {
      this.showDimension = !this.showDimension;
    } else if (section === 'features') {
      this.showFeatures = !this.showFeatures;
    }
  }


}
