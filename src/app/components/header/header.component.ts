import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Product } from '../../shared/models/Product';
import { ProductService } from '../../services/product/product.service';
import { Cart } from '../../shared/models/Cart';
import { CartService } from '../../services/cart/cart.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, SearchBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  products: Product[] = [];
  cart!: Cart;
  displayElement: boolean = false;

  constructor(private productService:ProductService, activatedRoute:ActivatedRoute, private cartService:CartService, private router: Router) {
    // activatedRoute.params.subscribe((params) => {
    //   if(params['searchTerm'])
    //   this.products = this.productService.getAllProductBySearchTerm(params['searchTerm']);
    //   else
    //   this.products = productService.getAll();
    // });
  }

  ngOnInit(){

    // Écouter les changements de route
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Mettre à jour la condition pour afficher l'élément sur plusieurs routes
      this.displayElement = ['/delivery-form', '/payment-form', '/summary'].includes(event.url);
    });


    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

}
