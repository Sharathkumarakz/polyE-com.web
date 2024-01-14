import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminDeactivateService implements CanActivate {

  private router = inject(Router);

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
        const adminExist = localStorage.getItem('super-infoTech');
        if (adminExist) {
          this.router.navigate(['/super-admin/dashboard']); 
          return false;  
        } else { 
          return true; //authentication success
        }
    }
}

