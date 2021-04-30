import { ConsigneeserviceService } from "./../consigneeservice.service";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  constructor(private service: ConsigneeserviceService) {}
  manualSearch = false;
  ngOnInit(): void {}

  manual() {
    this.manualSearch = true;
  }

  closeManual() {
    this.manualSearch = false;
  }
}
