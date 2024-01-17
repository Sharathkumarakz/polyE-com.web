import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminActiveGuardervice implements CanActivate {

  private router = inject(Router);

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
        const adminExist = localStorage.getItem('admin-infoTech');
        if (adminExist) {
          return true; //authentication success
        } else {
          this.router.navigate(['/admin']); 
          return false;  
        }
    }
}

