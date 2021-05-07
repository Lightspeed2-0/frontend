import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-transstatus",
  templateUrl: "./transstatus.component.html",
  styleUrls: ["./transstatus.component.scss"],
})
export class TransstatusComponent implements OnInit {
  @Input() Status: any[] = [];
  iconArray = [
    "fas fa-check",
    "fas fa-truck-moving",
    "fas fa-dolly-flatbed",
    "fas fa-box",
    "fas fa-shipping-fast",
  ];

  stats: any[] = [
    { _id: 0, Status: "Driver Assigned" },
    { _id: 1, Status: "Vehicle Reached" },
    { _id: 2, Status: "Order Pickedup" },
    { _id: 3, Status: "Order Dispatched" },
    { _id: 4, Status: "Order Delivered" },
  ];
  orderStatus: any = [
    {
      Status: null,
      Date: null,
      Time: null,
    },
    {
      Status: null,
      Date: null,
      Time: null,
    },
    {
      Status: null,
      Date: null,
      Time: null,
    },
    {
      Status: null,
      Date: null,
      Time: null,
    },
    {
      Status: null,
      Date: null,
      Time: null,
    },
  ];
  constructor() {}
  ngOnInit(): void {
    for (let i = 0; i < this.Status.length; i++) {
      this.orderStatus[i] = {
        Status: this.stats[i].Status,
        Date: this.Status[i].Date,
        Time: this.Status[i].Time,
      };
    }
  }
}
