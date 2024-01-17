import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'admin-panel',component:ContentLayoutComponent},
  {path:'category',component:ContentLayoutComponent},
  {path:'products',component:ContentLayoutComponent},
  {path:'active-admins',component:ContentLayoutComponent},
  {path:'su-admin-orders',component:ContentLayoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
