import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  dynamicPlaceholder: string = 'Je cherche...';
  phrases: string[] = [
    'Je cherche un canapé...',
    'Je cherche une table...',
    'Je cherche une chaise...',
    'Je cherche un tapis...',
    'Je cherche une lampe...'
  ];
  currentPhraseIndex: number = 0;
  typingIndex: number = 0;
  intervalId: number | undefined;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) this.searchTerm = params['searchTerm'];
    });
  }

  ngOnInit(): void {
    this.startPlaceholderTypingEffect();
  }

  ngOnDestroy(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }

  search(term: string): void {
    if (term) {
      this.router.navigateByUrl('/search/' + term);
    }
  }

  startPlaceholderTypingEffect(): void {
    this.intervalId = window.setInterval(() => {
      if (this.typingIndex < this.phrases[this.currentPhraseIndex].length) {
        this.dynamicPlaceholder = this.phrases[this.currentPhraseIndex].substring(0, this.typingIndex + 1);
        this.typingIndex++;
      } else {
        this.typingIndex = 0;
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
      }
    }, 200); // Vitesse de saisie (en millisecondes)
  }
}
