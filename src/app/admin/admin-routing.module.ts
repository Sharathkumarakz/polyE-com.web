import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminActiveGuardervice } from '../guards/admin.guard';
import { AdminDeactiveGuardService } from '../guards/admin-deactive.guard';

const routes: Routes = [
  {path:'',component:LoginComponent,canActivate:[AdminDeactiveGuardService]},
  {path:'register', component:RegisterComponent,canActivate:[AdminDeactiveGuardService]},
  {path:'admin-panel',component:ContentLayoutComponent,canActivate:[AdminActiveGuardervice]},
  {path:'users',component:ContentLayoutComponent,canActivate:[AdminActiveGuardervice]},
  {path:'products',component:ContentLayoutComponent,canActivate:[AdminActiveGuardervice]},
  {path:'category',component:ContentLayoutComponent,canActivate:[AdminActiveGuardervice]},
  {path:'orders',component:ContentLayoutComponent,canActivate:[AdminActiveGuardervice]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
