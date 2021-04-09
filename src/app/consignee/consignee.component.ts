import { ConsigneeserviceService } from "./consigneeservice.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-consignee",
  templateUrl: "./consignee.component.html",
  styleUrls: ["./consignee.component.scss"],
})
export class ConsigneeComponent implements OnInit {
  image: any;
  constructor(
    private router: Router,
    private service: ConsigneeserviceService
  ) {}
  ngOnInit(): void {}
  logOut() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/Login");
  }
}
