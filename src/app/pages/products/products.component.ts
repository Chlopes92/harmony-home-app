import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../shared/models/Product';
import { CommonModule } from '@angular/common';
import { NavCategoryComponent } from '../../components/nav-category/nav-category.component';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { BrowserModule } from '@angular/platform-browser';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule, NavCategoryComponent, ToastComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  @ViewChild(ToastComponent) 
  toast!: ToastComponent;

  constructor(
    private productService: ProductService,
    public activatedRoute: ActivatedRoute,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const subCategoryId = params['subCategoryId'];
      const searchTerm = params['searchTerm'];

      if (subCategoryId) {
        this.productService.getProductsBySubCatgories(subCategoryId).subscribe((data: Product[]) => {
          this.products = data;
        });
      } else if (searchTerm) {
        this.productService.getProductBySearchTerm(searchTerm).subscribe((data: Product[]) => {
          this.products = data;
        });
      }
    });

    // Vérifiez si un produit est en attente d'ajout à la liste de souhaits
    this.checkPendingWishlistProduct();
  }

  onWishlistClick(event: Event, product: Product) {
    event.preventDefault();
    this.addToWishlist(product);
  }

  addToWishlist(product: Product) {
    if (this.isUserLoggedIn()) {
      this.wishlistService.addToWishlist(product);
      this.showToast('Le produit a été ajouté à vos favoris !', 'success');
    } else {
      localStorage.setItem('pendingWishlistProduct', JSON.stringify(product));
      this.showToast('Veuillez vous connecter pour ajouter à la wishlist !', 'info');
    }
    setTimeout(() => {
      this.router.navigate(['/wishlist']);
    }, 1000); 
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
      }, 3000); 
    } else {
      console.error('Toast component not initialized');
    }
  }

  isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  productInWishlist(productId: string): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  private checkPendingWishlistProduct(): void {
    const pendingProduct = localStorage.getItem('pendingWishlistProduct');
    if (pendingProduct && this.isUserLoggedIn()) {
      const product: Product = JSON.parse(pendingProduct);
      this.wishlistService.addToWishlist(product);
      localStorage.removeItem('pendingWishlistProduct');
    }
  }

  
}
