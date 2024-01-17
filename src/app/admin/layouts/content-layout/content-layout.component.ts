import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.css'
})
export class ContentLayoutComponent {
  public router= inject(Router);

  logout(){
     localStorage.removeItem('admin-infoTech');
     this.router.navigate(['/admin']);
  }
}
