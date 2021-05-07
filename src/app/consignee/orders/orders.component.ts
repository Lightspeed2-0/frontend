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
  biddingSearch = false;
  ngOnInit(): void {}

  manual() {
    this.service.popup = true;
    this.manualSearch = true;
  }

  bidding() {
    this.service.popup = true;
    this.biddingSearch = true;
  }

  closeManual() {
    this.service.popup = false;
    this.manualSearch = false;
  }

  closeBidding() {
    this.service.popup = false;
    this.biddingSearch = false;
  }
}
