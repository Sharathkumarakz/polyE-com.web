import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
import { AdminGuardService } from '../guards/super-admin.guard';
import { AdminDeactivateService } from '../guards/super-deactivate.guard';

const routes: Routes = [
  {path:'',component:LoginComponent,canActivate:[AdminDeactivateService]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AdminGuardService]},
  {path:'admin-requests',component:DashboardComponent,canActivate:[AdminGuardService]},
  {path:'category',component:DashboardComponent,canActivate:[AdminGuardService]},
  {path:'products',component:DashboardComponent,canActivate:[AdminGuardService]},
  {path:'active-admins',component:DashboardComponent,canActivate:[AdminGuardService]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuAdminRoutingModule { }
