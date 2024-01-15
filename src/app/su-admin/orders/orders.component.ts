import { Component, OnInit, inject } from '@angular/core';
import { SuperAdminService } from '../../services/super-admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
    private superAdminService = inject(SuperAdminService);


    orderdata:any;

    ngOnInit(): void {
      this.getOrders();
    }

    getOrders(){
      this.superAdminService.getOrders().subscribe((res:any)=>{
        this.orderdata = res.data;  
    })
    }

    onStatusChange(id:string,event:any){
       const data ={
        orderId:id,
        status:event.target.value
       }
       this.superAdminService.setOrderStatus(data).subscribe(()=>{
          this.getOrders();
       })
    }
}
 