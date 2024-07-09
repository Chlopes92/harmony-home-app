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
    const savedUser = this.userService.getCurrentUser();
    if (savedUser) {
      this.currentUser = savedUser;
    }

    this.userService.currentUser.subscribe(
      (user: User | null) => {
        this.currentUser = user;
        console.log('Utilisateur actuel:', this.currentUser);
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
      }
    );
  }

  deleteAccount(): void {
    const userId = this.currentUser?.id;

    if (userId) {
      this.userService.deleteAccount(userId).subscribe(
        (response) => {
          console.log('Compte supprimé', response);
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

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
