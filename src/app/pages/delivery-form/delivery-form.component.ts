import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cart } from '../../shared/models/Cart';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.css']
})
export class DeliveryFormComponent implements OnInit {
  cart!: Cart;
  deliveryForm!: FormGroup;
  validationError: string[] = [];

  constructor(private cartService: CartService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });

    this.initDeliveryForm();
  }

  initDeliveryForm() {
    this.deliveryForm = this.formBuilder.group({
      delivery_name: [null, [Validators.required]],
      delivery_firstname: [null, [Validators.required]],
      delivery_country: [null, [Validators.required]],
      delivery_street: [null, [Validators.required]],
      delivery_floor: [null],
      delivery_postcode: [null, [Validators.required]],
      delivery_city: [null, [Validators.required]],
      delivery_phone: [null, [Validators.required]],
    });
  }

  onDelivery() {
    this.validationError = [];
    console.log(this.deliveryForm.value);

    if (this.deliveryForm.invalid) {
      Object.keys(this.deliveryForm.controls).forEach((input) => {
        const currentInput = this.deliveryForm.get(input);
        if (currentInput && currentInput.status === "INVALID") {
          this.validationError.push(input);
        }
      });
      console.log(this.validationError);
    } else {
      this.router.navigate(['/payment-form']);
    }
  }
}
