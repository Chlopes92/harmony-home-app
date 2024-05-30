import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchTerm: string = '';

  dynamicPlaceholder: string = 'Je cherche...'; // Texte affiché dans le champ de recherche.
  phrases: string[] = [ // Liste de phrases pour le texte dynamique.
    'Je cherche un canapé...',
    'Je cherche une table...',
    'Je cherche une chaise...',
    'Je cherche un tapis...',
    'Je cherche une lampe...'
  ];
  currentPhraseIndex: number = 0; // Index pour suivre la progression de l'animation de texte (phrases).
  typingIndex: number = 0; // Index pour suivre la progression de l'animation de texte (caractères).
  intervalId: number | undefined; // Identifiant de l'intervalle de temps pour l'animation.

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService) {
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) this.searchTerm = params['searchTerm'];
    });
  }

  // Méthode appelée à l'initialisation du composant.
  ngOnInit(): void {
    this.startPlaceholderTypingEffect(); // Démarrer l'effet de saisie du placeholder.
  }

  // Méthode appelée lors de la destruction du composant.
  ngOnDestroy(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId); // Arrêter l'intervalle pour éviter les problèmes de performance.
    }
  }


  search(term: string): void {
    if (term) {
      this.router.navigateByUrl('/search/' + term);
    }
  }

  // Méthode pour démarrer l'effet de saisie du placeholder
  startPlaceholderTypingEffect(): void {
    this.intervalId = window.setInterval(() => {
      // Si le texte n'est pas complètement affiché
      if (this.typingIndex < this.phrases[this.currentPhraseIndex].length) {
        // Ajouter le caractère suivant au placeholder
        this.dynamicPlaceholder = this.phrases[this.currentPhraseIndex].substring(0, this.typingIndex + 1);
        this.typingIndex++; // Passer au caractère suivant
      } else {
        // Réinitialiser pour la phrase suivante
        this.typingIndex = 0;
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length; // Passer à la phrase suivante
      }
    }, 200); // Vitesse de saisie (200 millisecondes)
  }
}