import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../shared/models/Product';
import { CommonModule } from '@angular/common';
import { NavCategoryComponent } from '../../components/nav-category/nav-category.component';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule, NavCategoryComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

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

  addToWishlist(product: Product) {
    if (this.isUserLoggedIn()) {
      this.wishlistService.addToWishlist(product);
      alert(`${product.title} a été ajouté à votre liste de souhaits.`);
    } else {
      // Stockez le produit dans localStorage 
      localStorage.setItem('pendingWishlistProduct', JSON.stringify(product));
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
