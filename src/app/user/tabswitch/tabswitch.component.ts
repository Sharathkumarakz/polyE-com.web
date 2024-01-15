import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../../services/auth-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabswitch',
  templateUrl: './tabswitch.component.html',
  styleUrl: './tabswitch.component.css'
})
export class TabswitchComponent implements OnInit{

    private userService = inject(UserService);
    private toastr = inject(ToastrService);
    private authService = inject(AuthServiceService);
    private router = inject(Router);

    selectedCategory:string ='';
    categories:any;
    subCategory:any;
    product:any;

    ngOnInit(): void {
       this.userService.getCategories().subscribe((res:any)=>{
        this.categories = res.data;
        this.selectedCategory = res.data[0]._id;
        this.getSubCategory(res.data[0]._id);
       })
    }

    getSubCategory(id:string){
      this.selectedCategory = id;
      this.getAllProductsOfMainCtegory(id);
      this.userService.getSubCategories(id).subscribe({
        next:(res:any)=>{
           this.subCategory = res.data;  
        },
        error:(err)=>{
            this.toastr.warning(err.error.message);
        }
      })
    } 


    getAllProductsOfMainCtegory(id?:string){
       this.userService.getProductsByCategory(id ? id : this.selectedCategory).subscribe((res:any)=>{
        this.product = res.data;
       })
    }


    categorySwitching(id:string){
      this.userService.getProductsByActualCategories(this.selectedCategory,id).subscribe((res:any)=>{
        this.product = res.data;
       })
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


    viewProduct(id:string){
      this.router.navigate(['/view-product/'+id]);
    }

}
