import { Component, OnInit, inject } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  private authService = inject(AuthServiceService);
  private router = inject(Router);

  user:any;
  
  ngOnInit(): void {
   this.getUserDetails();
  }

  getUserDetails(){
  this.authService.isUserActivate().subscribe({
    next: (data) => {
      this.user = data.user;
    },
    error: (err) => {
      console.log(err);
    },
   });
   }

}
