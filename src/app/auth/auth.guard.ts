import { AuthserviceService } from './authservice.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthserviceService, private router: Router) {}
  canActivate() {
    if (this.auth.getToken()) {
      return true;
    } else {
      this.router.navigateByUrl('/Login');
      return false;
    }
  }
}
