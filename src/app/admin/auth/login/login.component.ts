import { Component, inject } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  /**
   * Dependancy injection
   */
  private fb = inject(FormBuilder);
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  /**
   * variables
   */
  loginForm :any;
  isConfirmPasswordFaild = false;
  isEmailInvalid = false;
  subscriptions: Subscription[] = [];

  /**
   * component initing (lifecycle hook)
   */
  ngOnInit(): void {
    this.initFormGroup()
  }


  /**
   * Reactive form initialisation
   */
  initFormGroup(): void { 
    this.loginForm = this.fb.group({
      email: new FormControl('', [  
        Validators.required,Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ]),
    });
  }

  /**
   * @description -login form submition
   */
  login(){
    if(this.loginForm.invalid){
      this.loginForm.controls.email.markAsTouched();
      this.loginForm.controls.password.markAsTouched()
      return;
    }
    let loginDetails = this.loginForm.getRawValue();
    this.subscriptions.push(this.authService.adminLogin(loginDetails).subscribe({
      next:(res)=>{
        localStorage.setItem('admin-infoTech', res.jwttoken);
        this.router.navigate(['/admin/admin-panel']);
      },
      error:(err)=>{
        this.toastr.warning(err.error.message, 'warning');
      }
    })
    );
  }

/**
 * destroing all calls
 */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });

  } 
}