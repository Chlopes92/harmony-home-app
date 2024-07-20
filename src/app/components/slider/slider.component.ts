import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  slides = [
    {
      image: 'assets/img-product/canape-moderne.png',
      name: 'Canapé en tissu sarcelle',
      price: '€1,300.00',
      url: 'http://localhost:4200/product-details/44'
    },
    {
      image: 'assets/img-product/fauteuil-moderne.png',
      name: 'Fauteuil lounge moderne vert',
      price: '€750.00',
      url: 'http://localhost:4200/product-details/42'
    },
    {
      image: 'assets/img-product/canape-menthe.png',
      name: 'Canapé contemporain vert menthe',
      price: '€859.90',
      url: 'http://localhost:4200/product-details/38'
    }
  ];
  currentIndex = 0;

  ngAfterViewInit() {
    this.updateClasses();
    setInterval(() => this.nextSlide(), 3000); // Change la slide toute les 3 seconds
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex === 0) ? this.slides.length - 1 : this.currentIndex - 1;
    this.updateClasses();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex === this.slides.length - 1) ? 0 : this.currentIndex + 1;
    this.updateClasses();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateClasses();
  }

  updateClasses() {
    const items = document.querySelectorAll('.carousel__item');
    items.forEach((item, index) => {
      item.classList.remove('carousel__item--left', 'carousel__item--main', 'carousel__item--right');
      if (index === this.currentIndex) {
        item.classList.add('carousel__item--main');
      } else if (index === (this.currentIndex - 1 + this.slides.length) % this.slides.length) {
        item.classList.add('carousel__item--left');
      } else if (index === (this.currentIndex + 1) % this.slides.length) {
        item.classList.add('carousel__item--right');
      }
    });
  }
}
