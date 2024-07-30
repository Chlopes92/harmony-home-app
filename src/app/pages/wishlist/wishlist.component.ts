import { Component } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { EmptyWishlistComponent } from '../../components/empty-wishlist/empty-wishlist.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    EmptyWishlistComponent, 
    CommonModule, 
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishlist!: Product[];

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.wishlistService.getWishlistObservable().subscribe((wishlist) => {
      this.wishlist = wishlist.items;
    });
  }

  removeFromWishlist(product: Product): void {
    this.wishlistService.removeFromWishlist(product.id);
  }

  clearWishlist(): void {
    this.wishlistService.clearWishlist();
  }
}
