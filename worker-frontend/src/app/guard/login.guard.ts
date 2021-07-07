import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) {}

  expectedRoles = [];
  userRoles;

  canActivate(route: ActivatedRouteSnapshot): boolean {
    this.userRoles = this.authservice.getUserRole().trim();
    this.expectedRoles = route.data.expectedRole;
    if (!this.authservice.getIsLogin()) {
      this.router.navigate(['auth']);
      return false;
    } else if (!this.expectedRoles.includes(this.userRoles)) {
      console.log(123);
      this.router.navigate(['main']);
      alert('Yetkiniz Yok');
    }
    return true;
  }
}
