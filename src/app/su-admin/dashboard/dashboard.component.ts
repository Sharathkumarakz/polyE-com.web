import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  public router= inject(Router);

  logout(){
     localStorage.removeItem('super-infoTech');
     this.router.navigate(['/super-admin']);
  }
}
