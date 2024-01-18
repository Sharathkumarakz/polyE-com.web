import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrl: './buy-now.component.css'
})
export class BuyNowComponent implements OnInit{
  
  private userService= inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

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
        ])
      });
    }


  makeOrder(){
    if(this.orderForm?.invalid){
      this.orderForm.markAllAsTouched();
      return;
    }
    const address ={
      address:this.orderForm.get('address').value,
      product:this.product._id
    }
    this.userService.makeOrder(address).subscribe((res)=>{
      this.router.navigate(['/order-success']);
    })
  }

}

