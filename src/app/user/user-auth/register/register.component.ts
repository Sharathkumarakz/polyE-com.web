import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
 
  /**
   * DEpendancy injection
   */
  private fb = inject(FormBuilder);
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  /**
   * variables
   */
  registerForm :any;
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
    this.registerForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [
        Validators.required,Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ]),
      phoneNo: new FormControl('',[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }



  /**
   * @description -register form submition
   */
  register(){
    if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
    }

    if(this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value){
      this.toastr.warning('confirm password failed')
      return;
    }
    let registerDetails = this.registerForm.getRawValue();
    
    this.subscriptions.push(this.authService.register(registerDetails).subscribe({
      next:(res)=>{
        this.toastr.success(res.message, 'Success'); 
        setTimeout(() => {
          this.router.navigate(['/auth/otp-verification'],{ queryParams: { data: registerDetails.email }});
        }, 2000);  
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