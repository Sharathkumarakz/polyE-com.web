import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{

  private userService = inject(UserService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  product:any[] = []; 
  loading = false;
  ngOnInit(): void {
    this.userService.getWishList().subscribe((res:any) => {
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

  viewProduct(id:string){
    this.router.navigate(['/view-product/'+id]);
  }
}
