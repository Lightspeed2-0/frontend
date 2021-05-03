import { HttpErrorResponse } from "@angular/common/http";
import { ConsigneeserviceService } from "./../consigneeservice.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-moreorder",
  templateUrl: "./moreorder.component.html",
  styleUrls: ["./moreorder.component.scss"],
})
export class MoreorderComponent implements OnInit {
  panelOpenState = false;
  clicked = true;
  orderTitle = "";
  Orders: any[] = [];

  constructor(private service: ConsigneeserviceService) {}

  ngOnInit(): void {
    this.clicked = true;
    this.service.getOrder().subscribe(
      (res) => {
        this.clicked = false;
        const response = res["indents"];
        this.Orders = response;
        console.log(response);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          console.error(err);
        }
      }
    );
  }
}
