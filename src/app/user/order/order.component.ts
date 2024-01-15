import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {


  private userService = inject(UserService);

  loader = false;
  order :any;

  ngOnInit(): void {
    this.userService.getOrders().subscribe((res:any)=>{
      this.order = res.data;
    })
  }
}
