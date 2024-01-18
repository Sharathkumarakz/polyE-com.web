import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buy-without-signup',
  templateUrl: './buy-without-signup.component.html',
  styleUrl: './buy-without-signup.component.css'
})
export class BuyWithoutSignupComponent implements OnInit{
  
  private userService= inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  loader=true;
  address :string = ''
  product:any;
  id = '';
  orderForm:any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.userService.getProductDetails(this.id).subscribe({
     next:(res:any) =>{
     this.product = res.data[0];
     },error:()=>{
      this.router.navigate(['/'])
     }}) 
    this.initFormGroup();
  }

    /**
   * Reactive form initialisation
   */
    initFormGroup(): void { 
      this.orderForm = this.fb.group({
        address: new FormControl('', [
          Validators.required
        ]),
        email: new FormControl('', [
          Validators.required,Validators.email
        ]),
        phoneNo: new FormControl('',[
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$'),
        ]),
      });

    }


  makeOrder(){
    if(this.orderForm?.invalid){
      this.orderForm.markAllAsTouched();
      return;
    }
    const address ={
      address:this.orderForm.get('address').value,
      product:this.product._id,
      phone:this.orderForm.get('phoneNo').value,
      email:this.orderForm.get('email').value,
    }
    this.userService.makeOrder(address).subscribe({
    next:(res:any)=>{
      this.router.navigate(['/order-success'], {
        queryParams: { orderId: res.code },
      });
    },
    error:(err) =>{
      this.toastr.info(err.error.message);
    }
  })
  }

}

