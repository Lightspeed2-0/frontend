import { ConsigneeserviceService } from "./consigneeservice.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-consignee",
  templateUrl: "./consignee.component.html",
  styleUrls: ["./consignee.component.scss"],
})
export class ConsigneeComponent implements OnInit {
  image: any;
  profile = false;
  constructor(
    private router: Router,
    private service: ConsigneeserviceService,
    private route: ActivatedRoute
  ) {}
  Username = this.route.snapshot.params["username"];
  ngOnInit(): void {}

  onProfile() {
    this.profile = !this.profile;
  }

  logOut() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/Login");
  }
}
