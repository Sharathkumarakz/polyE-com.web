import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'admin-requests',component:DashboardComponent},
  {path:'category',component:DashboardComponent},
  {path:'products',component:DashboardComponent},
  {path:'active-admins',component:DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuAdminRoutingModule { }
