import { Component, HostListener, OnInit, inject } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

    private authService = inject(AuthServiceService);
    private router = inject(Router);


    //header scroll effect
    isScrolledDown = false;
    prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    name:string | undefined;
    
    ngOnInit(): void {
     this.getUserDetails();
    }

    getUserDetails(){
    this.authService.isUserActivate().subscribe({
      next: (data) => {
        this.name = data.user.username;
      },
      error: (err) => {
      },
    });
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollPos > this.prevScrollPos) {
      this.isScrolledDown = true;
    } else {
      this.isScrolledDown = false;
    }

    this.prevScrollPos = currentScrollPos;
  }

  logout(){
    this.name = undefined;
    localStorage.removeItem('infoTech');
     this.router.navigate(['/']);
  }
}
