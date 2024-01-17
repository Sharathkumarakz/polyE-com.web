import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ToastrService } from 'ngx-toastr';
import { CategoryComponent } from '../su-admin/category/category.component';
import { ProductsComponent } from '../su-admin/products/products.component';
import { OrdersComponent } from '../su-admin/orders/orders.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule, 
    SharedModule
  ],
  providers:[
    ToastrService,
  ] 
})
export class AdminModule { }
