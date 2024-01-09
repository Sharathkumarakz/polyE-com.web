import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAuthRoutingModule } from './user-auth-routing.module';
import { AuthServiceService } from '../../services/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpComponent
  ],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
    SharedModule
  ]
})
export class UserAuthModule { }
