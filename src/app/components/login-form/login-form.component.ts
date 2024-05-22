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
  loginForm!: FormGroup;
  validationError: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private wishlistService: WishlistService // Injectez le service de wishlist
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe({
        next: ({ token, user }) => {
          localStorage.setItem('token', token);

          // Obtenez l'URL sauvegardée
          const redirectUrl = localStorage.getItem('redirectUrl') || '/user-space';
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl'); // Nettoyez après la redirection

          // Vérifiez si un produit est en attente d'ajout à la liste de souhaits
          this.checkPendingWishlistProduct();
        },
        error: error => {
          alert('Email ou mot de passe incorrect');
        }
      });
    }
  }

  private checkPendingWishlistProduct(): void {
    const pendingProduct = localStorage.getItem('pendingWishlistProduct');
    if (pendingProduct) {
      const product: Product = JSON.parse(pendingProduct);
      this.wishlistService.addToWishlist(product);
      localStorage.removeItem('pendingWishlistProduct');
    }
  }
}
