import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
   constructor(private router: Router) {
  }

  canActivate() {
    
    const cu = JSON.parse(localStorage.getItem('currentUser'));
    if (cu) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
 
}
