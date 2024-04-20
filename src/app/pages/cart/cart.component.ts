import { Component, OnInit } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { CartService } from '../../services/cart/cart.service';
import { CartItem } from '../../shared/models/CartItem';
import { EmptyCartComponent } from '../../components/empty-cart/empty-cart.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [EmptyCartComponent, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cart!: Cart;

  constructor(private cartService:CartService){ }

  ngOnInit(){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart
    });
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.product.id);
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.product.id, quantity);
  }

  clearCart() {
    this.cartService.clearCart();
  }
  
}