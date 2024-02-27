import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/sub-category/sub-category.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { SummeryComponent } from './pages/summery/summery.component';
import { LegalInformationComponent } from './pages/legal-information/legal-information.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { GeneralConditionsComponent } from './pages/general-conditions/general-conditions.component';

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent
    },
    {
        path:"category",
        component: CategoryComponent
    },
    {
        path:"products",
        component: ProductsComponent
    },
    {
        path:"product-details/:id",
        component: ProductDetailsComponent
    },
    {
        path:"wishlist",
        component: WishlistComponent
    },
    {
        path:"cart",
        component: CartComponent
    },
    {
        path:"contact",
        component: ContactComponent
    },
    {
        path:"summery",
        component: SummeryComponent
    },
    {
        path:"legal-information",
        component: LegalInformationComponent
    },
    {
        path:"privacy-policy",
        component: PrivacyPolicyComponent
    },
    {
        path:"general-conditions-of-sale",
        component: GeneralConditionsComponent
    },
    {
        path:"not-found",
        component: NotFoundComponent
      },
      {
        path: "**",
        redirectTo: 'not-found'
      }
];
