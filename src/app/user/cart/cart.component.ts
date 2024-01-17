import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  private userService = inject(UserService);

  loader = true;
  cart:any;
  total:number = 0;
  count:number = 0;
  countChanging = false;
  updatingIndex = 0;

  ngOnInit(): void {
    this.loadCartData();
  }

  loadCartData(){
    this.userService.getCartData().pipe(finalize(()=>{
      this.loader = false;
    })).subscribe((res:any)=>{
      this.cart = res.data.cart;
      this.total = res.data.cartTotalPrice;
    });
  }


  changeCount(type:'minus' | 'plus',prodId:string){
     if(this.countChanging){
      return
     }
     this.countChanging = true;
     this.cart.forEach((cart:any,i:number) => {
       if(cart.product._id === prodId){
        this.updatingIndex = i;
        if(type === 'minus'){
          if(this.cart[i].quantity === 1){
            this.countChanging = false;
            return;
          }         
          this.cart[i].quantity -= 1;
          this.count = -1;
        }else{
          if(this.cart[i].quantity === this.cart[i].product.stock){
            this.countChanging = false;
            return;
          }    
          this.cart[i].quantity += 1;
          this.count = 1;
        }
       }
     });
     let data ={product:prodId,count:this.count}
     this.userService.cartQuantityChange(data).pipe(finalize(()=>{
      this.countChanging = false;
     })).subscribe((res:any)=>{
      if(type === 'minus'){
         this.cart[this.updatingIndex].productTotalPrice -= this.cart[this.updatingIndex].product.price;
      }else{
        this.cart[this.updatingIndex].productTotalPrice += this.cart[this.updatingIndex].product.price;
      }
      this.total = res.data.cartTotalPrice; 
     })
  }

  removeFromCart(id:string){
     this.userService.removeFromCart(id).subscribe((res:any)=>{
      if(res.success){
        this.loadCartData();
      }
     })
  }

}
