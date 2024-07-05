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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.userService.currentUser.subscribe(
      (user: User | null) => {
        if (user) {
          console.log('Utilisateur actuel:', user);
          this.currentUser = user;
        } else {
          console.log('Aucun utilisateur connecté');
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
      }
    );
  }

  deleteAccount(): void {
    if (this.currentUser) {
      const userId = this.currentUser.id;

      this.userService.deleteAccount(userId).subscribe(
        (response) => {
          console.log('Compte supprimé', response);
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Erreur lors de la suppression du compte', error);
        }
      );
    } else {
      console.error('Aucun utilisateur connecté');
    }
  }
}
