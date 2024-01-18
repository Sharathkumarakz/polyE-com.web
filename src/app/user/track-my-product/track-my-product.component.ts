import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-track-my-product',
  templateUrl: './track-my-product.component.html',
  styleUrl: './track-my-product.component.css'
})
export class TrackMyProductComponent implements OnInit{
  
  private userService= inject(UserService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);


  product:any;
  id = '';
  orderForm:any;

  ngOnInit(): void {
    this.initFormGroup();
  }


      /**
   * Reactive form initialisation
   */
      initFormGroup(): void { 
        this.orderForm = this.fb.group({
          orderId: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
          ]),
          phoneNo: new FormControl('',[
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern('^[0-9]*$'),
          ]),
        });
      }
  
      track(){
        if(this.orderForm?.invalid){
          this.orderForm.markAllAsTouched();
          return;
        }
        const order ={
          orderId:this.orderForm.get('orderId').value,
          phone:this.orderForm.get('phoneNo').value,
        }
        this.userService.getOrderById(order).subscribe({
        next:(res:any)=>{
           this.product = res.data;
        },
        error:(err) =>{
          this.toastr.info(err.error.message);
        }
      })
      }
}
