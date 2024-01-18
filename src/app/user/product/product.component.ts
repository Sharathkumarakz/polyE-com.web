import { Component, OnInit, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{


  private userService = inject(UserService);
  private activatedRoute =inject(ActivatedRoute);
  private router =inject(Router);
  private authService = inject(AuthServiceService);
  private toastr = inject(ToastrService);

  id ='';
  product:any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.userService.getProductDetails(this.id).subscribe({
     next:(res:any) =>{
     this.product = res.data;
     },error:()=>{
      this.router.navigate(['/'])
     }}) 
  }
  

  
  addTowhishlist(id:string){
    this.authService.isUserActivate().subscribe({
     next:() =>{
        this.userService.addToWhishList(id).subscribe((res:any) => {
          if(res.success){
            this.toastr.success("Added to wishlist");
          }
          if(res.exist){
            this.toastr.info("Already in whish list");
          }
        });
     },error:() =>{
      Swal.fire({
        title: 'You need to login first!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!'
      }).then((result) => {
        if(result.isConfirmed){
          this.router.navigate(['/auth/login']);
        }
         } )
     }
    })
  }


  addToCart(id:string){
    this.authService.isUserActivate().subscribe({
     next:() =>{
        this.userService.addToCart(id).subscribe((res:any) => {
          if(res.success){
            this.toastr.success("Added to Cart");
          }
          if(res.exist){
            this.toastr.info("Already in Cart");
          }
        });
     },error:() =>{
      Swal.fire({
        title: 'You need to login first!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!'
      }).then((result) => {
        if(result.isConfirmed){
          this.router.navigate(['/auth/login']);
        }
         } )
     }
    })
  }

  buyNow(id:string){
    if(localStorage.getItem('infoTech')){
      this.router.navigate(['/buy-now/'+id]);
    }else{
      this.router.navigate(['/buy-now/without-authentication/'+id]); 
    }
  }

}
