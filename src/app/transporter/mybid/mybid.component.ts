import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TransporterService } from "../transporter.service";

@Component({
  selector: "app-mybid",
  templateUrl: "./mybid.component.html",
  styleUrls: ["./mybid.component.scss"],
})
export class MybidComponent implements OnInit {
  clicked = false;
  panelOpenState = false;
  isEmpty = false;

  Bids: any[] = [];

  constructor(private service: TransporterService) {}

  getMyBids() {
    this.service.myBid().subscribe(
      (res) => {
        this.clicked = false;
        console.log(res);
        this.Bids = res["bids"];
        if (this.Bids.length === 0) {
          this.isEmpty = true;
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error);
        }
      }
    );
  }

  ngOnInit(): void {
    this.clicked = true;
    this.getMyBids();
  }
}
