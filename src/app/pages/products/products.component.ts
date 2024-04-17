import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../shared/models/Product';
import { CommonModule } from '@angular/common';
import { NavCategoryComponent } from '../../components/nav-category/nav-category.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, CommonModule, NavCategoryComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];

  constructor(private productService: ProductService, public activatedRoute: ActivatedRoute) {
    // activatedRoute.params.subscribe((params) => {
    //   if(params['searchTerm'])
    //   this.products = this.productService.getAllProductBySearchTerm(params['searchTerm']);
    //   else
    //   this.products = productService.getAll();
    // });
  }

  ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        console.log(params); 
        const subCategoryId = params['subCategoryId'];
        console.log('subCategoryId: ', subCategoryId);
        this.productService.getProductsBySubCatgories(subCategoryId).subscribe((data: Product[]) => {
          console.log('product: ', data);
          this.products = data;
        });
      });
  }

}
