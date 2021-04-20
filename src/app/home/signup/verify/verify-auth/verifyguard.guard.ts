import { VerfiyserviceService } from "./verfiyservice.service";
import { Injectable } from "@angular/core";
import { ActivatedRoute, CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class VerifyguardGuard implements CanActivate {
  constructor(
    private verifyService: VerfiyserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  canActivate() {
    if (this.verifyService.isVerified[2]) {
      return true;
    } else {
      this.router.navigateByUrl(`/Signup`);
      return false;
    }
  }
}
