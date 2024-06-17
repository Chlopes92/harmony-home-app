import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../shared/models/Cart';
import { StripePaymentElementComponent } from 'ngx-stripe';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, StripePaymentElementComponent ], 
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {
  paymentForm!: FormGroup;
  validationError: string [] = [];
  cart!: Cart;

  constructor(private formBuilder: FormBuilder, private router: Router, private cartService: CartService) {} // Injection du service d'adresse

  ngOnInit() {
    this.initPaymentForm();

    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });

  }

  initPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      card_number: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      card_expiration: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/?([0-9]{2})$')]],
      card_cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      card_name: ['', [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$")]]
    });
  }

  onPay() {
    this.validationError = [];
    console.log(this.paymentForm.value);

    if (this.paymentForm.invalid) {
      Object.keys(this.paymentForm.controls).forEach((input) => {
        const currentInput = this.paymentForm.get(input);
        if (currentInput && currentInput.status === "INVALID") {
          this.validationError.push(input);
        }
      });
      console.log(this.validationError);
    } else {
      // Process payment
      this.router.navigate(['/summary']);
    }
  }

}
