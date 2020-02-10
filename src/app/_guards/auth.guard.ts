// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
 
  canActivate() {
    //только если пользователь 'visitor'
    if (!this.authService.isLoggedIn()) {
      console.log('canActivate');
      this.router.navigate(['/auth/login']);
      return false;
    } else {
      if (this.authService.isLoggedInType()==='visitor') {
      return true;
      } else {return false;}
    }
  }
 
}
