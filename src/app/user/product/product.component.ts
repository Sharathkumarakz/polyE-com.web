import { Component, OnInit, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{


  private userService = inject(UserService);
  private activatedRoute =inject(ActivatedRoute);
  private router =inject(Router);

  id ='';
  product:any;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
    this.userService.getProductDetails(this.id).subscribe({
     next:(res:any) =>{
     this.product = res.data;
     console.log(this.product);
     
     },error:()=>{
      this.router.navigate(['/'])
     }})
  
  }
  

  
  // addTowhishlist(id:string){
  //   this.authService.isUserActivate().subscribe({
  //    next:() =>{
  //       this.userService.addToWhishList(id).subscribe((res:any) => {
  //         if(res.success){
  //           this.toastr.success("Added to wishlist");
  //         }
  //         if(res.exist){
  //           this.toastr.info("Already in whish list");
  //         }
  //       });
  //    },error:() =>{
  //     Swal.fire({
  //       title: 'You need to login first!',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Login now!'
  //     }).then((result) => {
  //       if(result.isConfirmed){
  //         this.router.navigate(['/auth/login']);
  //       }
  //        } )
  //    }
  //   })
  // }

}
