import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { TransporterService } from "./../transporter.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-transbid",
  templateUrl: "./transbid.component.html",
  styleUrls: ["./transbid.component.scss"],
})
export class TransbidComponent implements OnInit {
  clicked = false;
  isEmpty = false;
  panelOpenState = false;
  loaded = false;

  Bids: any[] = [];

  form: FormGroup = new FormGroup({
    Amount: new FormControl(null, Validators.required),
  });

  constructor(private service: TransporterService) {}

  getBids() {
    this.service.getBid().subscribe(
      (res) => {
        console.log(res);
        this.clicked = false;
        this.Bids = res["bids"];
        if (this.Bids.length == 0) {
          this.isEmpty = true;
        }
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

  acceptBid(id: string) {
    this.loaded = true;
    this.service.acceptBid({ BidId: id, ...this.form.value }).subscribe(
      (res) => {
        this.loaded = false;
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
