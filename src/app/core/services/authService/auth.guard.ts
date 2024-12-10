import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust the path as needed

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    const userRole = this.authService.getRole();

    if (token && userRole) {
      const expectedRole = route.data['role'];

      if (userRole === expectedRole) {
        return true; // Grant access
      }
      this.router.navigate(['/unauthorized']);
      return false;
    } else {
      // Redirect to login if no token is found
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}



