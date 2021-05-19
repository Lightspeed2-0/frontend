import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ConsigneeserviceService } from "../consigneeservice.service";

@Component({
  selector: "app-pooling",
  templateUrl: "./pooling.component.html",
  styleUrls: ["./pooling.component.scss"],
})
export class PoolingComponent implements OnInit {
  clicked = false;
  isEmpty = false;
  popup = false;
  msg = "";
  // panelOpenState = false;

  Pool: any[] = [];
  close: any[] = [];
  accept: any[] = [];
  orderId = "";
  requestId = "";
  index = 0;
  cancel: any[] = [];
  panelOpenState: any[] = [];

  displayedColumns = ["Id", "Username", "Amount", "Accept"];

  constructor(
    private service: ConsigneeserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getPooling() {
    this.Pool.length = 0;
    this.service.getPool().subscribe(
      (res) => {
        console.log(res);
        this.clicked = false;
        this.Pool = res["indents"];

        if (this.Pool.length == 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }

        this.cancel.length = this.Pool.length;
        this.panelOpenState.length = this.Pool.length;
        this.cancel.fill(false);
        this.panelOpenState.fill(false);
        this.close.length = this.Pool.length;
        this.accept.length = this.accept.length;

        this.close.fill(false);
        this.accept.fill(false);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error.msg);
        }
      }
    );
  }

  ngOnInit(): void {
    this.clicked = true;
    this.getPooling();
  }

  onSuggest(indent: any) {
    this.service.poolIndent = indent;
    console.log(indent);
    this.router.navigateByUrl(
      `/Consignee/${this.service.Username}/Suggested Orders`
    );
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
      .accepPool({
        IndentId: this.orderId,
        PoolingRequestId: this.requestId,
        IsAccepted: true,
      })
      .subscribe(
        (res) => {
          console.log(res);
          if (res.msg === "Payment Successful") {
            this.popup = false;
            this.clicked = true;
            this.getPooling();
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
          this.clicked = true;
          this.getPooling();
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
        this.clicked = true;
        this.getPooling();
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error.error.msg);
        }
      }
    );
  }
}
