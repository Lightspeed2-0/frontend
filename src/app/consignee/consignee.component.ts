import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-consignee",
  templateUrl: "./consignee.component.html",
  styleUrls: ["./consignee.component.scss"],
})
export class ConsigneeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  logOut() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/Login");
  }
}
