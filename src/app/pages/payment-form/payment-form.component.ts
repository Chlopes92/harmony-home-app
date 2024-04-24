import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent {
  paymentForm!: FormGroup;
  validationError: string [] = [];

  constructor(private formBuilder: FormBuilder, private router: Router){}

  ngOnInit(){
    this.initPaymenForm();
  }

  initPaymenForm(){
    this.paymentForm = this.formBuilder.group({
      card_number: ['', [Validators.required]],
      card_expiration: ['', [Validators.required]],
      card_cvv: ['', [Validators.required]],
      card_name: ['', [Validators.required]]
    });
  }

  onPay(){
    this.validationError = [];
    console.log(this.paymentForm.value);

    if(this.paymentForm.invalid){
      Object.keys(this.paymentForm.controls).forEach((input)=>{
        const currentInput = this.paymentForm.get(input);
        if(currentInput && currentInput.status === "INVALID"){
          this.validationError.push(input);
        }
        // console.log(input,currentInput);
      })
      console.log(this.validationError)
    }else{
      this.router.navigate(['/payment-form']);
    }
  }

}
