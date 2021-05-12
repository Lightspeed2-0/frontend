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

  Bids: any[] = [{ _id: 0 }];
  displayedColumns = ["Id", "Username", "Amount", "Accept"];
  trans: any[] = [
    {
      _id: "123235476gbd",
      Username: "Jitiendran ks",
      Amount: 1000,
    },
    {
      _id: "123235476gbd",
      Username: "Jitiendran ks",
      Amount: 1000,
    },
    {
      _id: "123235476gbd",
      Username: "Jitiendran ks",
      Amount: 1000,
    },
    {
      _id: "123235476gbd",
      Username: "Jitiendran ks",
      Amount: 1000,
    },
    {
      _id: "123235476gbd",
      Username: "Jitiendran ks",
      Amount: 1000,
    },
  ];

  constructor(private service: ConsigneeserviceService) {}

  getBids() {
    this.service.viewBids().subscribe(
      (res) => {
        this.clicked = false;
        this.Bids = res["Bids"];

        if (this.Bids.length == 0) {
          this.isEmpty = true;
        }
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

  onAccept(bidId: string, transId: string) {
    this.service.acceptBid({ BidId: bidId, TrasnporterId: transId }).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error.msg);
        }
      }
    );
  }
}
