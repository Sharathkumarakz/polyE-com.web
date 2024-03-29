import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './home/home.component';
import { AddsComponent } from './adds/adds.component';
import { TabswitchComponent } from './tabswitch/tabswitch.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SharedModule } from '../shared/shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderComponent } from './order/order.component';
import { BuyNowComponent } from './buy-now/buy-now.component';
import { BuyWithoutSignupComponent } from './buy-without-signup/buy-without-signup.component';
import { TrackMyProductComponent } from './track-my-product/track-my-product.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    AddsComponent,
    TabswitchComponent,
    FooterComponent,
    ProfileComponent,
    WishlistComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    OrderComponent,
    BuyNowComponent,
    BuyWithoutSignupComponent,
    TrackMyProductComponent
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
  ],
  providers:[
    UserService,
    ToastrService
  ]       
})
export class UserModule { }
