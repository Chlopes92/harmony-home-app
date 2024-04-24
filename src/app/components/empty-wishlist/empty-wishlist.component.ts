import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-wishlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './empty-wishlist.component.html',
  styleUrl: './empty-wishlist.component.css'
})
export class EmptyWishlistComponent {

}
