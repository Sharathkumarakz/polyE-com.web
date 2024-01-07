import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './home/home.component';
import { AddsComponent } from './adds/adds.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    AddsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
