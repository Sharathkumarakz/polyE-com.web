import { NgModule } from '@angular/core';

import { UserAuthRoutingModule } from './user-auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpComponent } from './otp/otp.component';
import { SharedModule } from '../../shared/shared/shared.module';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    OtpComponent
  ],
  imports: [
    UserAuthRoutingModule,
    SharedModule,
  ],
  providers:[
    ToastrService,
  ]  
})
export class UserAuthModule { }
