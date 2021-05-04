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
  popup = false;
  msg = "";
  clicked = true;
  orderTitle = "";
  Orders: any[] = [];
  orderId = "";
  index = 0;

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

  onProceed(id: string, index: number) {
    this.popup = true;
    this.msg = "Pay";
    this.index = index;
    this.orderId = id;
  }

  onDecline(id: string, index: number) {
    this.popup = true;
    this.msg = "Decline";
    this.index = index;
    this.orderId = id;
  }

  onClose() {
    this.popup = false;
  }

  onPayment() {
    this.service.postPayment({ _id: this.orderId, IsAccpeted: true }).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error);
        }
      }
    );
  }

  Declined() {
    this.service
      .postDecline({ _id: this.orderId, IsAccepted: false })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            console.error(error.error);
          }
        }
      );
  }
}
