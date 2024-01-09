import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthServiceService } from '../../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
 
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
  registerForm :any;
  isConfirmPasswordFaild = false;
  isEmailInvalid = false;
  subscriptions: Subscription[] = [];
  document: File | null = null;
  photo: File | null = null;

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
        Validators.pattern('^[0-9]*$')
      ]),
      place: new FormControl('', [
        Validators.required, Validators.minLength(3)
      ]),
      state: new FormControl('', [
        Validators.required, Validators.minLength(3)
      ]),
      photo: new FormControl('', [
        Validators.required,
      ]),
      document: new FormControl('', [
        Validators.required,
      ]),
    });
  }


  onDocSelected(event:Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.document = input.files[0];
    } else {
      this.document = null;
    }
  }

  
  onPhotoSelected(event:Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.photo = input.files[0];
    } else {
      this.photo = null;
    }
  }



  /**
   * @description -register form submition
   */
  register(){
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    
    const formData = new FormData();
    let registerDetails = this.registerForm.getRawValue();
   
    if(registerDetails.password !== registerDetails.confirmPassword){
      this.toastr.warning("Confirm password failed");
      return;
    }

    if(this.photo && this.document){
      formData.append('photo', this.photo, this.photo.name);
      formData.append('document', this.document, this.document.name);
      formData.append('textFieldName', JSON.stringify(registerDetails));
    }

    this.subscriptions.push(this.authService.adminRegister(formData).subscribe({
      next:(res)=>{
        this.router.navigate(['/']);
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