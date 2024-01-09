import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
      phoneNo: new FormControl(['',Validators.required, Validators.minLength(10),Validators.pattern('^[0-9]*$')]),
    });
  }

  /**
   * @description -password confirmation 
   * @param event -input event
   * @returns 
   */
  passwordValidtion(event :KeyboardEvent){
    if(this.isConfirmPasswordFaild){
      if (event.key === 'Backspace' || event.code === 'Backspace') {
        this.isConfirmPasswordFaild = false;
        return;       
      }
    if(this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value){
      this.isConfirmPasswordFaild = true;
    }else{
      this.isConfirmPasswordFaild = false;
    }
    }
  }

  /**
   * @description -register form submition
   */
  register(){
    // if (this.registerForm.invalid) {
    //   this.registerForm.markAllAsTouched();
    //   if (this.registerForm.get('password').value && this.registerForm.get('confirmPassword').value && this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value) {
    //     this.isConfirmPasswordFaild = true;
    //   } else {
    //     this.isConfirmPasswordFaild = false;
    //   }
    //   return;
    // }

    // if (this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value) {
    //   this.isConfirmPasswordFaild = true;
    // } else {
    //   this.isConfirmPasswordFaild = false;
    // }
    let registerDetails = this.registerForm.getRawValue();
    console.log(registerDetails,"sendingg");
    
    this.subscriptions.push(this.authService.register(registerDetails).subscribe({
      next:(res)=>{
        this.router.navigate(['/auth/otp-verification'],{ queryParams: { data: registerDetails.email }});
        // this._toastr.success(res.message, 'Success'); 
      },
      error:(err)=>{
        // this._toastr.warning(err.error.message, 'warning');
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