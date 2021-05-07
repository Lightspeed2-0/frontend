import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TransporterService } from "../transporter.service";

@Component({
  selector: "app-transvieworder",
  templateUrl: "./transvieworder.component.html",
  styleUrls: ["./transvieworder.component.scss"],
})
export class TransvieworderComponent implements OnInit {
  panelOpenState = false;
  loaded = false;
  Orders: any[] = [];
  accept: any[] = [];
  isEmpty = true;

  constructor(private service: TransporterService) {}

  getOrders() {
    this.service.getOrders().subscribe(
      (res) => {
        console.log(res);
        this.loaded = false;
        this.Orders = res["Orders"];
        if (this.Orders.length > 0) {
          this.isEmpty = false;
        }
        this.accept.length = this.Orders.length;
        this.accept.fill(false);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
        }
      }
    );
  }

  ngOnInit(): void {
    this.loaded = true;
    this.getOrders();
  }

  onDecline(id: string, index: number) {
    this.service.cancelOrder({ IndentId: id }).subscribe(
      (res) => {
        console.log(res);
        this.loaded = true;
        this.getOrders();
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error.msg);
        }
      }
    );
  }
}
