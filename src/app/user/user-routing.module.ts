import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserGuardService } from '../guards/user-activate.guard';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'view-product/:id',component:ProductComponent},
  {path:'wishList',component:WishlistComponent,canActivate:[UserGuardService]},
  {path:'auth',loadChildren:()=>import('./user-auth/user-auth.module').then((m)=>m.UserAuthModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
