import { Injectable } from '@angular/core';
import { Wishlist } from '../../shared/models/Wishlist';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../shared/models/Product';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Wishlist = this.getWishlistFromLocalStorage();
  private wishlistSubject: BehaviorSubject<Wishlist> = new BehaviorSubject(this.wishlist);

  constructor() { }

  addToWishlist(product: Product): void {
    if (this.wishlist.items.find(item => item.id === product.id)) {
      return;
    }
    this.wishlist.items.push(product);
    this.setWishlistToLocalStorage();
  }

  removeFromWishlist(productId: string): void {
    this.wishlist.items = this.wishlist.items.filter(item => item.id !== productId);
    this.setWishlistToLocalStorage();
  }

  clearWishlist(): void {
    this.wishlist = new Wishlist();
    this.setWishlistToLocalStorage();
  }

  getWishlistObservable(): Observable<Wishlist> {
    return this.wishlistSubject.asObservable();
  }

  private setWishlistToLocalStorage(): void {
    const wishlistJson = JSON.stringify(this.wishlist);
    localStorage.setItem('Wishlist', wishlistJson);
    this.wishlistSubject.next(this.wishlist);
  }

  private getWishlistFromLocalStorage(): Wishlist {
    const wishlistJson = localStorage.getItem('Wishlist');
    return wishlistJson ? JSON.parse(wishlistJson) : new Wishlist();
  }

  isInWishlist(productId: string): boolean {
    const wishlist = this.getWishlistFromLocalStorage();
    return wishlist.items.some(item => item.id === productId);
  }
}
