import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { LegalInformationComponent } from './pages/legal-information/legal-information.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { GeneralConditionsComponent } from './pages/general-conditions/general-conditions.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { DeliveryFormComponent } from './pages/delivery-form/delivery-form.component';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';
import { UserSpaceComponent } from './pages/user-space/user-space.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { authGuard } from './guard/auth.guard';
import { ConnectionComponent } from './pages/connection/connection.component';
import { SignUpFormComponent } from './pages/sign-up-form/sign-up-form.component';
import { SummaryComponent } from './pages/summary/summary.component';

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent
    },
    {
        path:"category",
        component: SubCategoryComponent
    },
    {
        path:"category/:slug",
        component: SubCategoryComponent
    },
    {
        path:'search/:searchTerm',
        component: ProductsComponent
    },
    {
        path:"category/:subCategoryId/products",
        component: ProductsComponent
    },
    {
        path:"product-details/:id",
        component: ProductDetailsComponent
    },
    {
        path:"wishlist",
        component: WishlistComponent,
        canActivate: [authGuard]
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
        path:"delivery-form",
        component: DeliveryFormComponent,
        canActivate: [authGuard]
    },
    {
        path:"payment-form",
        component: PaymentFormComponent,
        canActivate: [authGuard]
    },
    {
        path:"summary",
        component: SummaryComponent,
        canActivate: [authGuard]
    },
    {
        path:"user-space",
        component: UserSpaceComponent,
        canActivate: [authGuard]
    },
    {
        path:"login",
        component: ConnectionComponent
    },
    {
        path:"sign-up",
        component: SignUpFormComponent
    },
    {
        path:"new-password",
        component: NewPasswordComponent
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
