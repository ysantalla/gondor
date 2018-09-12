import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@app/core/services/auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const roles: any = this.authService.getRoles();

    if (!roles) {
      this.authService.logout();
      this.router.navigate(['auth/login']);
      this.snackBar.open('Role not found', 'X', {duration: 3000});
      return false;
    }

    if (!this.authService.isLoggedIn() || !roles.find(p => p.name === expectedRole)) {
      this.authService.logout();
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
}
