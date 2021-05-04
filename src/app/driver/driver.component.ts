import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { DriverService } from "./driver.service";

@Component({
  selector: "app-driver",
  templateUrl: "./driver.component.html",
  styleUrls: ["./driver.component.scss"],
})
export class DriverComponent implements OnInit {
  image: any;
  profile = false;
  popup = false;
  UserProfile = false;
  Username = "";

  constructor(
    private service: DriverService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    localStorage.removeItem("Email");
    this.service.Username = this.route.snapshot.params["Username"];
    this.Username = this.service.Username;
  }

  onProfile() {
    this.profile = !this.profile;
  }

  logOut() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/DriverLogin");
  }
}
