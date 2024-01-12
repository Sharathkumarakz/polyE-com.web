import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuperAdminService } from '../../services/super-admin.service';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule,
    NgSelectModule, 
  ],
  providers:[AuthServiceService,SuperAdminService] 
})
export class SharedModule { }
