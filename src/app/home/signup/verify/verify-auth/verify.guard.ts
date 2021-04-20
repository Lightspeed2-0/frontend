import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class VerifyGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    if (localStorage.getItem("Email")) {
      return true;
    } else {
      this.router.navigateByUrl("/");
      return false;
    }
  }
}
