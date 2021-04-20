import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { VerfiyserviceService } from "./verify-auth/verfiyservice.service";
@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
})
export class VerifyComponent implements OnInit {
  icons = [
    "fas fa-check",
    "fas fa-envelope",
    "fas fa-id-card",
    "fas fa-forward",
  ];
  isVerified: boolean[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private verifyService: VerfiyserviceService
  ) {}
  ngOnInit() {
    this.isVerified = this.verifyService.isVerified;
  }
  onClick(index: number) {
    if (index === 2) {
      this.router.navigateByUrl(
        `/Verify/${this.route.snapshot.params["email"]}`
      );
    }
    if (index === 3) {
      this.router.navigate(["pan"], { relativeTo: this.route });
    }
  }
}
