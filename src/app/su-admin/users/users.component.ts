import { Component, inject } from '@angular/core';
import { SuperAdminService } from '../../services/super-admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private superAdminService = inject(SuperAdminService);
  private toastr = inject(ToastrService);

  userData:any;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.superAdminService.getUsers().subscribe((res:any)=>{
      this.userData = res.data;  
  })
  }

  
  block(id:string,name:string){
    this.superAdminService.blockUser(id).subscribe({
      next:(res:any)=>{
        this.toastr.success(`User ${name} blocked successfully`)
        this.getUsers();
      },
      error:(err)=>{
          this.toastr.warning(err.error.message)
      }
    })
  }

  unBlock(id:string,name:string){
    this.superAdminService.unblockUser(id).subscribe({
      next:(res:any)=>{
        this.toastr.success(`User ${name} un-blocked successfully`)
        this.getUsers();
      },
      error:(err)=>{
          this.toastr.warning(err.error.message)
      }
    })
  }

}