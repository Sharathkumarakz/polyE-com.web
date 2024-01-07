import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './home/home.component';
import { AddsComponent } from './adds/adds.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { TabswitchComponent } from './tabswitch/tabswitch.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    AddsComponent,
    ProductCardComponent,
    TabswitchComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]     
})
export class UserModule { }
