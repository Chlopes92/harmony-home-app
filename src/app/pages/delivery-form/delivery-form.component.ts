import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Cart } from '../../shared/models/Cart';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Observable, map, startWith } from 'rxjs';

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
  submitted = false; 
  countries: string[] = ["France", "Belgique", "Suisse", "Canada", "États-Unis", "Allemagne", "Royaume-Uni"];
  filteredCountries!: Observable<string[]>;

  constructor(private cartService: CartService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });

    this.initDeliveryForm();

    this.filteredCountries = this.deliveryForm.controls['delivery_country'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountries(value))
    );
  }

  private _filterCountries(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(country => country.toLowerCase().includes(filterValue));
  }

  initDeliveryForm() {
    this.deliveryForm = this.formBuilder.group({
      delivery_name: [null, [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$")]],
      delivery_firstname: [null, [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$")]],
      delivery_country: [null, [Validators.required]],
      delivery_street: [null, [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.'-]+$")]],
      delivery_floor: [null],
      delivery_postcode: [null, [Validators.required, Validators.pattern("^[0-9]{5}$")]],
      delivery_city: [null, [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ '-]+$")]],
      delivery_phone: [null, [Validators.required, Validators.pattern("^[0-9]{10}$")]],
    });
  }

  onDelivery() {
    this.submitted = true; 
    this.validationError = [];
    if (this.deliveryForm.invalid) {
      Object.keys(this.deliveryForm.controls).forEach((input) => {
        const currentInput = this.deliveryForm.get(input);
        if (currentInput && currentInput.status === "INVALID") {
          this.validationError.push(input);
        }
      });
    } else {
      this.router.navigate(['/payment-form']);
    }
  }
}
