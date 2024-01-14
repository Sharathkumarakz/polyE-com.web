import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { UserDeactivateService } from '../../guards/user-deactivate.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent,canActivate:[UserDeactivateService]},
  {path:'register',component:RegisterComponent,canActivate:[UserDeactivateService]},
  {path:'otp-verification',component:OtpComponent,canActivate:[UserDeactivateService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthRoutingModule { }
