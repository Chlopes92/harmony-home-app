import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { DeleteAccountResponse, User } from '../../shared/models/User';

@Component({
  selector: 'app-user-space',
  standalone: true,
  imports: [],
  templateUrl: './user-space.component.html',
  styleUrl: './user-space.component.css'
})
export class UserSpaceComponent {

  currentUser: User | null = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
  }

  deleteAccount(): void {
    if (this.currentUser) {
      const userId = this.currentUser.id;
      
      this.userService.supprimerCompte(userId).subscribe(
        (response: DeleteAccountResponse) => {
          console.log(response.message);
          // Rediriger l'utilisateur vers la page de connexion ou une autre page appropriée
          this.router.navigate(['/login']);
        },
        (error) => {
          // Gérer les erreurs, afficher un message d'erreur à l'utilisateur
          console.error('Erreur lors de la suppression du compte', error);
        }
      );
    } else {
      console.error('Aucun utilisateur connecté');
    }
  }
}
