import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {
  signUpForm!: FormGroup;
  submitted = false;
  hidePassword = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.initSignUpForm();
  }

  initSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\-']+$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\-']+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/)
      ]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}?\))?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/)]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  get f() { return this.signUpForm.controls; }

  onSignUp() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return;
    }

    const formData = this.signUpForm.value;
    this.signUp(formData.name, formData.firstname, formData.email, formData.password, formData.phone);
  }

  signUp(name: string, firstname: string, email: string, password: string, phone: string) {
    this.userService.signup(name, firstname, email, password, phone).subscribe({
      next: (data) => {
        console.log("Utilisateur créé avec succès", data);
        alert('Compte créé avec succès');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error("Erreur lors de la création de l'utilisateur", error);
      }
    });
  }
}
