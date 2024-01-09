import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuAdminRoutingModule } from './su-admin-routing.module';
import { SharedModule } from '../shared/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SuAdminRoutingModule,
    SharedModule
  ]
})
export class SuAdminModule { }
