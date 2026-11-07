import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SliderComponent } from '../../components/slider/slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  showArrow = true;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const yOffset = window.pageYOffset;
    this.showArrow = yOffset < 150; // La flèche disparaît après avoir défilé de 150px
  }

}
