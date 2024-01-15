import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { finalize } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  
  private userService= inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loader=true;
  cartdata:any;
  total:number=0;
  address :string = ''
  orderForm:any;

  ngOnInit(): void {
    this.loadCartData();
    this.initFormGroup();
  }

    /**
   * Reactive form initialisation
   */
    initFormGroup(): void { 
      this.orderForm = this.fb.group({
        address: new FormControl('', [
          Validators.required
        ])
      });
    }

  loadCartData(){
    this.userService.getCartData().pipe(finalize(()=>{
      this.loader = false;
    })).subscribe((res:any)=>{
      this.cartdata = res.data.cart;
      this.total = res.data.cartTotalPrice;
    });
  }

  makeOrder(){
    if(this.orderForm?.invalid){
      this.orderForm.markAllAsTouched();
      return;
    }
    const address ={
      address:this.orderForm.get('address').value
    }
    this.userService.makeOrder(address).subscribe((res)=>{
      this.router.navigate(['/order-success']);
    })
  }

}
