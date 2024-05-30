import { Component, Renderer2 } from '@angular/core';
import { CookiesService } from '../../services/cookies/cookies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookies-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookies-popup.component.html',
  styleUrl: './cookies-popup.component.css'
})
export class CookiesPopupComponent {
  showPopup!: boolean; // Propriété pour contrôler l'affichage du popup.

  // Le constructeur injecte le service des cookies et Renderer2 pour la manipulation DOM.
  constructor(private cookieService: CookiesService, private renderer: Renderer2) {}

  // Méthode appelée lors de l'initialisation du composant.
  ngOnInit() {
    this.showPopup = !this.cookieService.getCookie('cookiesAccepted'); // Affiche le popup si le cookie n'a pas été accepté.
    if (this.showPopup) {
      this.blockScroll(); // Bloque le défilement si le popup est affiché.
    }
  }

  // Méthode appelée lorsque l'utilisateur accepte les cookies.
  acceptCookies() {
    this.cookieService.setCookie('cookiesAccepted', true, 365); // Définit le cookie pour indiquer l'acceptation.
    this.showPopup = false; // Cache le popup.
    this.unblockScroll(); // Débloque le défilement.
  }

  // Méthode appelée lorsque l'utilisateur refuse les cookies.
  declineCookies() {
    this.cookieService.setCookie('cookiesAccepted', false, 365); // Définit le cookie pour indiquer le refus.
    this.showPopup = false; // Cache le popup.
    this.unblockScroll(); // Débloque le défilement.
  }

  // Méthode privée pour bloquer le défilement de la page.
  private blockScroll(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden'); // Bloque le défilement en cachant le dépassement.
    this.renderer.setStyle(document.body, 'height', '100%'); // Définit la hauteur à 100% pour empêcher le défilement.
  }

  // Méthode privée pour débloquer le défilement de la page.
  private unblockScroll(): void {
    this.renderer.removeStyle(document.body, 'overflow'); // Supprime le style de dépassement caché.
    this.renderer.removeStyle(document.body, 'height'); // Supprime le style de hauteur défini.
  }
}
