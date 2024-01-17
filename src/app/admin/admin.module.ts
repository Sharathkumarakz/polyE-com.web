import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ToastrService } from 'ngx-toastr';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { AdminService } from '../services/admin.service';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ContentLayoutComponent,
    AdminUsersComponent,
    AdminProductsComponent,
    AdminCategoryComponent,
    AdminOrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule, 
    SharedModule
  ],
  providers:[
    ToastrService,
    AdminService
  ] 
})
export class AdminModule { }
