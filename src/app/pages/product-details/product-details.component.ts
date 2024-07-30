import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  product!: Product;
  showDimension = false;
  showFeatures = false;
  @ViewChild(ToastComponent) 
  toast!: ToastComponent

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

  addToWishlist(): void {
    if (this.product) {
      if (this.isUserLoggedIn()) {
        this.wishlistService.addToWishlist(this.product);
        this.showToast('Le produit a été ajouté à vos favoris !', 'success');
        this.router.navigate(['/wishlist']);
      } else {
        this.showToast('Veuillez vous connecter pour ajouter aux favoris !', 'info');
      }
      // setTimeout(() => {
      //   this.router.navigate(['/wishlist']);
      // }, 1000); 
    }
  }

  showToast(message: string, type: 'success' | 'info' | 'warning' | 'error'): void {
    if (this.toast) {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
      setTimeout(() => {
        if (this.toast) {
          this.toast.show = false;
        }
      }, 3000); // Le toast disparaît après 3 secondes
    } else {
      console.error('Toast component not initialized');
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
  
  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.showToast('Le produit a été ajouté à votre panier !', 'success');
    }
    // setTimeout(() => {
    //   this.router.navigate(['/cart']);
    // }, 1000); 
  }

  toggleSection(section: string) {
    if (section === 'dimension') {
      this.showDimension = !this.showDimension;
    } else if (section === 'features') {
      this.showFeatures = !this.showFeatures;
    }
  }


}
