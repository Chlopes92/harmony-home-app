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
  isCreated: boolean = false; 
  signUpForm!: FormGroup;
  validationError: string [] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService){}

  ngOnInit() {
    this.initSignUpForm();
  }

  initSignUpForm(){
    this.signUpForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  onSignUp() {
  if (this.signUpForm.invalid) {
    console.log('Formulaire invalide', this.signUpForm.errors);
    alert('Erreur lors de la création du compte');
    return; // Arrête l'exécution si le formulaire est invalide
  }

  const formData = this.signUpForm.value;
  this.signUp(formData.name, formData.firstname, formData.email, formData.password, formData.phone);
}

signUp(name: string, firstname: string, email: string, password: string, phone: string) {
  this.userService.signup(name, firstname, email, password, phone).subscribe({
    next: (data) => {
      console.log("Utilisateur créé avec succès", data);
      this.isCreated = true;
      alert('Compte crée avec succès');

      // const redirectUrl = localStorage.getItem('/login');
      //   this.router.navigate([redirectUrl]);
        // localStorage.removeItem('redirectUrl'); // Nettoyer après la redirection
    },
    error: (error) => {
      console.error("Erreur lors de la création de l'utilisateur", error);
    }
  });
}
}
