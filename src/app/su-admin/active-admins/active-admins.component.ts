import { Component, OnInit, inject } from '@angular/core';
import { SuperAdminService } from '../../services/super-admin.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-active-admins',
  templateUrl: './active-admins.component.html',
  styleUrl: './active-admins.component.css'
})
export class ActiveAdminsComponent implements OnInit{

  private superAdminService = inject(SuperAdminService);
  private toster = inject(ToastrService);

  requstList:any[] = [];

  ngOnInit(): void {
    this.superAdminService.getAdmins().subscribe({
      next:(res:any)=>{
         this.requstList =res.data;  
      },
      error:(err)=>{
          this.toster.warning(err.error.message)
      }
    })
  }


  block(id:string,name:string){
    this.superAdminService.block(id).subscribe({
      next:(res:any)=>{
        this.toster.success(`Admin ${name} blocked successfully`)
         this.requstList = res.data;
      },
      error:(err)=>{
          this.toster.warning(err.error.message)
      }
    })
  }

  unBlock(id:string,name:string){
    this.superAdminService.unBlock(id).subscribe({
      next:(res:any)=>{
        this.toster.success(`Admin ${name} un-blocked successfully`)
        this.requstList = res.data;
      },
      error:(err)=>{
          this.toster.warning(err.error.message)
      }
    })
  }


  access(id:string,action:string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change access!'
    }).then((result) => {
      if (result.isConfirmed) {
         this.superAdminService.deleteProduct(id)
         .subscribe({
          next:(res:any) => {
            Swal.fire(
              'Updated!',
              'Admin access changed.',
              'success'
            )
            const data ={
              id:id,
              access: action
            }
            this.superAdminService.manageAccesss(data).subscribe({
             next:(res:any)=>{
              this.requstList = res.data;
             },
             error:(err)=>{
             }
            })
        },
        error:(err) => {
          this.toster.warning(err.error.message,'Warning')
        }
       } )
      }
    })
  }
  }

