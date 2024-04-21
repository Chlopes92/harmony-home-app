import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm!: FormGroup;
  validationError: string [] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService){}

  ngOnInit(){

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,]],
      password: ['', [Validators.required]],
    });

  }

  onLogin(){
    if(this.loginForm.valid){
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe({
        next: ({ token, user }) => {
          localStorage.setItem('token', token);
          // console.log('Connexion de: ', user);
          
          // Obtenir l'URL sauvegardée
          const redirectUrl = localStorage.getItem('redirectUrl') || '/user-space';
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl'); // Nettoyer après la redirection
        },
        error: error => {
          alert('Erreur lors de la connexion');
        }
      });
    }
  }
}