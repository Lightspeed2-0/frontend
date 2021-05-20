import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ConsigneeserviceService } from "./../consigneeservice.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-suggestions",
  templateUrl: "./suggestions.component.html",
  styleUrls: ["./suggestions.component.scss"],
})
export class SuggestionsComponent implements OnInit {
  constructor(
    private service: ConsigneeserviceService,
    private router: Router
  ) {}

  loaded = false;
  isEmpty = true;

  panelOpenState: any[] = [];
  Orders: any[] = [];
  clicked: any[] = [];
  indent: any;

  getOrders() {
    this.service.recommendPool(this.service.poolIndent).subscribe((res) => {
      console.log(res);
      this.loaded = false;
      this.Orders = res["orders"];
      if (this.Orders.length > 0) {
        this.isEmpty = false;
      }
      this.panelOpenState.length = this.Orders.length;
      this.clicked.length = this.Orders.length;

      this.panelOpenState.fill(false);
      this.clicked.fill(false);
    });
  }

  ngOnInit(): void {
    this.loaded = true;
    this.getOrders();
    this.indent = this.service.poolIndent;
    console.log(this.service.poolIndent);
    console.log(this.indent);
  }

  onBack() {
    this.router.navigateByUrl(`/Consignee/${this.service.Username}/Pooling`);
  }

  onAccept(orderid: string, transporterid: string, index: number) {
    this.clicked[index] = true;
    const data = {
      OrderId: orderid,
      TransporterId: transporterid,
      IndentId: this.service.poolIndent._id,
    };
    this.service.requestPool(data).subscribe(
      (res) => {
        console.log(res);
        if (res.msg === "success") {
          this.router.navigateByUrl(
            `/Consignee/${this.service.Username}/Pooling`
          );
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error);
        }
      }
    );
  }
}
