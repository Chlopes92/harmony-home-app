import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { Cart } from '../../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(product: Product): void{
    let cartItem = this.cart.items.find(item => item.product.id === product.id);
    if(cartItem)
    return;

    this.cart.items.push(new CartItem(product));
    this.setCartToLocalStorage();
  }

  removeFromCart(productId: string): void{
    this.cart.items = this.cart.items.filter(item => item.product.id != productId);
    this.setCartToLocalStorage();
  }

  changeQuantity(productId: string, quantity: number) {
    let cartItem = this.cart.items.find(item => item.product.id === productId);
    if (!cartItem) return;
  
    cartItem.quantity = quantity;
    // Calcul du nouveau prix avec arrondi à deux décimales
    const updatedPrice = parseFloat((quantity * cartItem.product.price).toFixed(2));
    cartItem.price = updatedPrice;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => parseFloat((prevSum + currentItem.price).toFixed(2)), 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
  
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}