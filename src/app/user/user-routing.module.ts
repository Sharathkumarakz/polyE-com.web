import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserGuardService } from '../guards/user-activate.guard';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderComponent } from './order/order.component';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { BuyWithoutSignupComponent } from './buy-without-signup/buy-without-signup.component';
import { TrackMyProductComponent } from './track-my-product/track-my-product.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'view-product/:id',component:ProductComponent},
  {path:'wishList',component:WishlistComponent,canActivate:[UserGuardService]},
  {path:'cart',component:CartComponent,canActivate:[UserGuardService]},
  {path:'checkout',component:CheckoutComponent,canActivate:[UserGuardService]},
  {path:'orders',component:OrderComponent,canActivate:[UserGuardService]},
  {path:'order-success',component:OrderSuccessComponent},
  {path:'buy-now/:id',component:BuyNowComponent,canActivate:[UserGuardService]},
  {path:'buy-now/without-authentication/:id',component:BuyWithoutSignupComponent}, 
  {path:'track',component:TrackMyProductComponent},
  {path:'auth',loadChildren:()=>import('./user-auth/user-auth.module').then((m)=>m.UserAuthModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
