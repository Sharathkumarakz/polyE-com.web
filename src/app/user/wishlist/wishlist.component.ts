import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  private userService = inject(UserService);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private authService = inject(AuthServiceService);

  product:any[] = []; 
  loading = false;
  loader = true;

  ngOnInit(): void {
    this.userService.getWishList().pipe(finalize(()=>{
      this.loader = false;
    })).subscribe((res:any) => {
       this.product = res.data.wishlist;
    })
  }

  removeFromWishlist(id:string){
   if(this.loading){
    return;
   }
    this.loading = true;
    this.userService.removeFromWishlist(id).pipe(finalize(()=>{
      this.loading = false
    })).subscribe({
    next:(res:any) => {
    this.toastr.success('Removed successfully')
    this.product = res.data.wishlist;
    },error:(err) => {
     console.warn(err);
    }});
  }

  addToCart(id:string){
    this.authService.isUserActivate().subscribe({
     next:() =>{
        this.userService.addToCart(id).subscribe((res:any) => {
          if(res.success){
            this.product = this.product.filter((data)=>{
              return data.product._id !== id;
            })
            this.toastr.success("Added to Cart");
          }
          if(res.exist){
            this.product = this.product.filter((data)=>{
              return data.product._id !== id;
            })
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

  viewProduct(id:string){
    this.router.navigate(['/view-product/'+id]);
  }
}
