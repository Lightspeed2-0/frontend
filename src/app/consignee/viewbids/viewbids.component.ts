import { HttpErrorResponse } from "@angular/common/http";
import { ConsigneeserviceService } from "./../consigneeservice.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-viewbids",
  templateUrl: "./viewbids.component.html",
  styleUrls: ["./viewbids.component.scss"],
})
export class ViewbidsComponent implements OnInit {
  clicked = false;
  isEmpty = false;
  panelOpenState = false;

  Bids: any[] = [];
  close: any[] = [];
  accept: any[] = [];

  displayedColumns = ["Id", "Username", "Amount", "Accept"];

  constructor(private service: ConsigneeserviceService) {}

  getBids() {
    this.service.viewBids().subscribe(
      (res) => {
        this.clicked = false;
        this.Bids = res["bids"];

        if (this.Bids.length == 0) {
          this.isEmpty = true;
        }

        this.close.length = this.Bids.length;
        this.accept.length = this.accept.length;

        this.close.fill(false);
        this.accept.fill(false);

        console.log(res);
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
    this.getBids();
  }

  onAccept(bidId: string, transId: string, index: number) {
    this.accept[index] = true;
    this.service.acceptBid({ BidId: bidId, TransporterId: transId }).subscribe(
      (res) => {
        if (res.msg === "success") {
          this.clicked = true;
          this.getBids();
          this.accept[index] = false;
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error.msg);
        }
      }
    );
  }

  onClose(id: string, index: number) {
    this.close[index] = true;
    this.service.closeBid({ BidId: id }).subscribe(
      (res) => {
        if (res.msg === "success") {
          this.clicked = true;
          this.getBids();
          this.close[index] = false;
        }
        // console.log(res);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error);
        }
      }
    );
  }
}
