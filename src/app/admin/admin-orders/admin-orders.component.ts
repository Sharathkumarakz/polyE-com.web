import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent implements OnInit{
  private adminService = inject(AdminService);
  private toastr = inject(ToastrService);

  orderdata:any;

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.adminService.getOrders().subscribe((res:any)=>{
      this.orderdata = res.data;  
  })
  }

  onStatusChange(id:string,event:any){
     const data ={
      orderId:id,
      status:event.target.value
     }
     this.adminService.setOrderStatus(data).subscribe({
       next:(res) =>{
        this.getOrders();
       },
       error:(err) => {
        this.toastr.warning(err.error.message,'Warning')
      }
     })
  }
}

