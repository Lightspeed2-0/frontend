import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-status",
  templateUrl: "./status.component.html",
  styleUrls: ["./status.component.scss"],
})
export class StatusComponent implements OnInit {
  iconArray = [
    "fas fa-check",
    "fas fa-box",
    "fas fa-dolly-flatbed",
    "fas fa-shipping-fast",
  ];
  orderStatus: any = [
    {
      Status: "Ordered",
      Time: "Thu Apr 15 1:03PM",
    },
    {
      Status: null,
      Time: null,
    },
    {
      Status: null,
      Time: null,
    },
    {
      Status: null,
      Time: null,
    },
  ];
  constructor() {}
  ngOnInit(): void {}
}
