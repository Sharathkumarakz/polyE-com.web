import { Component, OnInit, inject } from '@angular/core';
import { SuperAdminService } from '../../services/super-admin.service';
import { ToastrService } from 'ngx-toastr';

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
}
