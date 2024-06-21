import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { WishlistService } from '../../services/wishlist/wishlist.service'; // Importez le service de wishlist
import { Product } from '../../shared/models/Product'; // Assurez-vous d'importer le modèle Product

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  validationError: string[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    const { email, password } = this.loginForm.value;

    this.userService.login(email, password).subscribe(
      response => {
        // Rediriger l'utilisateur vers la page de profil ou une autre page appropriée
        this.router.navigate(['/profile']);
      },
      error => {
        // Gérer les erreurs, afficher un message d'erreur à l'utilisateur
        console.error('Erreur lors de la connexion', error);
        this.validationError.push('Connexion échouée');
      }
    );
  }
}
