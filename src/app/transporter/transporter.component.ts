import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { TransporterService } from "./transporter.service";

@Component({
  selector: "app-transporter",
  templateUrl: "./transporter.component.html",
  styleUrls: ["./transporter.component.scss"],
})
export class TransporterComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: TransporterService
  ) {}

  Username = this.route.snapshot.params["username"];
  profile = false;
  image: any;
  popup = false;
  UserProfile = false;

  ngOnInit(): void {
    this.service.Username = this.Username;
  }

  onProfile() {
    this.profile = !this.profile;
  }

  Userprofile() {
    this.UserProfile = true;
    this.router.navigate(["Profile"], { relativeTo: this.route });
  }

  logOut() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/Login");
  }

  changeZIndex() {
    this.UserProfile = false;
  }
}
