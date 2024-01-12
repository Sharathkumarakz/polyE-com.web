import { Component, OnInit, inject } from '@angular/core';
import { SuperAdminService } from '../../services/super-admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrl: './admin-requests.component.css'
})
export class AdminRequestsComponent implements OnInit{

  private superAdminService = inject(SuperAdminService);
  private toster = inject(ToastrService);

  requstList:any[] = [];

  ngOnInit(): void {
    this.superAdminService.getAdminRequests().subscribe({
      next:(res:any)=>{
         this.requstList =res.data;  
      },
      error:(err)=>{
          this.toster.warning(err.error.message)
      }
    })
  }


  acceptRequest(id:string,name:string){
    this.superAdminService.verifyAdmins(id).subscribe({
      next:(res:any)=>{
        this.toster.success(`Admin ${name} verified successfully`)
         this.requstList = this.requstList.filter((data)=>{
           return data._id !== id;
         })
      },
      error:(err)=>{
          this.toster.warning(err.error.message)
      }
    })
  }
}
