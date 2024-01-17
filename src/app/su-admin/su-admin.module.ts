import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuAdminRoutingModule } from './su-admin-routing.module';
import { SharedModule } from '../shared/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrService } from 'ngx-toastr';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { ActiveAdminsComponent } from './active-admins/active-admins.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    AdminRequestsComponent,
    CategoryComponent,
    ProductsComponent,
    ActiveAdminsComponent,
    OrdersComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SuAdminRoutingModule,
    SharedModule,
  ], 
  providers:[
    ToastrService,
  ]
})
export class SuAdminModule { }
