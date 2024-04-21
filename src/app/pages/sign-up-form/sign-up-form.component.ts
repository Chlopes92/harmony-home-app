import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {
  signUpForm!: FormGroup;
  validationError: string [] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService){}

  initPaymenForm(){
    this.signUpForm = this.formBuilder.group({
      firstname: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      phone: [null, [Validators.required]],
    });
  }

  onSignUp(){
    this.validationError = [];
    console.log(this.signUpForm.value);

    if(this.signUpForm.invalid){
      Object.keys(this.signUpForm.controls).forEach((input)=>{
        const currentInput = this.signUpForm.get(input);
        if(currentInput && currentInput.status === "INVALID"){
          this.validationError.push(input);
        }
        // console.log(input,currentInput);
      })
      console.log(this.validationError)
    }else{
      this.router.navigate(['/user-space']);
    }
  }
}
