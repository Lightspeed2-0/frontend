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

  constructor(private service: TransporterService) {}

  ngOnInit(): void {
    this.service.getOrders().subscribe(
      (res) => {
        console.log(res);
        this.Orders = res;
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

  onDecline(id: string, index: number) {
    this.service.orderDecline({ _id: id }).subscribe(
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
