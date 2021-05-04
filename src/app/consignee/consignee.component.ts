import { ConsigneeserviceService } from "./consigneeservice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AfterContentChecked, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-consignee",
  templateUrl: "./consignee.component.html",
  styleUrls: ["./consignee.component.scss"],
})
export class ConsigneeComponent implements OnInit, AfterContentChecked {
  image: any;
  profile = false;
  popup = false;
  UserProfile = false;
  constructor(
    private router: Router,
    private service: ConsigneeserviceService,
    private route: ActivatedRoute
  ) {}
  Username = this.route.snapshot.params["Username"];

  ngOnInit(): void {
    localStorage.removeItem("Email");
    this.service.Username = this.Username;
  }

  ngAfterContentChecked() {
    this.popup = this.service.popup;
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
