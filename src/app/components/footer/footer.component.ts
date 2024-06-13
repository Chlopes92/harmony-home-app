import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  displayFooter: boolean = true;

  constructor(private router: Router) {
    }

  ngOnInit(){

    // Écouter les changements de route
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Mettre à jour la condition pour afficher l'élément sur plusieurs routes
      this.displayFooter = ['/login', '/sign-up', '/new-password','/delivery-form', '/payment-form', '/summary'].includes(event.url);
    });
  }

}
