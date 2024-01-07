import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    //header scroll effect
    isScrolledDown = false;
    prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
  
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
}
