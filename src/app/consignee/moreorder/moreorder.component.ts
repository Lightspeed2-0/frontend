import { HttpErrorResponse } from "@angular/common/http";
import { ConsigneeserviceService } from "./../consigneeservice.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-moreorder",
  templateUrl: "./moreorder.component.html",
  styleUrls: ["./moreorder.component.scss"],
})
export class MoreorderComponent implements OnInit {
  panelOpenState: any[] = [];
  popup = false;
  msg = "";
  clicked = true;
  orderTitle = "";
  Orders: any[] = [];
  orderId = "";
  requestId = "";
  index = 0;
  isEmpty = true;
  cancel: any[] = [];

  constructor(private service: ConsigneeserviceService) {}

  getOrders() {
    this.service.getOrder().subscribe(
      (res) => {
        this.clicked = false;
        const response = res["indents"];
        this.Orders = response;
        if (this.Orders.length > 0) {
          this.isEmpty = false;
        }
        this.cancel.length = this.Orders.length;
        this.panelOpenState.length = this.Orders.length;
        this.cancel.fill(false);
        this.panelOpenState.fill(false);
        console.log(response);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          console.error(err);
        }
      }
    );
  }

  ngOnInit(): void {
    this.clicked = true;
    this.getOrders();
  }

  onProceed(indentid: string, reqid: string, index: number) {
    this.popup = true;
    this.msg = "Pay";
    this.index = index;
    this.orderId = indentid;
    this.requestId = reqid;
  }

  onDecline(id: string, index: number) {
    this.popup = true;
    this.msg = "Decline";
    this.index = index;
    this.requestId = id;
  }

  onClose() {
    this.popup = false;
  }

  onPayment() {
    this.service
      .postPayment({
        IndentId: this.orderId,
        RequestId: this.requestId,
        IsAccepted: true,
      })
      .subscribe(
        (res) => {
          console.log(res);
          if (res.msg === "Payment Successful") {
            this.popup = false;
            this.getOrders();
          }
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
      .postDecline({ RequestId: this.requestId, IsAccepted: false })
      .subscribe(
        (res) => {
          console.log(res);
          this.getOrders();
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            console.error(error.error);
          }
        }
      );
  }

  onCancel(id: string, index: number) {
    this.cancel[index] = true;
    this.service.cancelOrder({ IndentId: id }).subscribe(
      (res) => {
        this.cancel[index] = false;
        console.log(res);
        this.getOrders();
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error.error.msg);
        }
      }
    );
  }
}
