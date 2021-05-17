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
  panelOpenState = false;

  Bids: any[] = [{ _id: 1 }];
  close: any[] = [];
  accept: any[] = [];

  displayedColumns = ["Id", "Username", "Amount", "Accept"];

  constructor(
    private service: ConsigneeserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getPooling() {
    this.service.getPool().subscribe(
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
    this.getPooling();
  }

  onSuggest(indent: any) {
    this.service.poolIndent = indent;
    this.router.navigateByUrl(
      `/Consignee/${this.service.Username}/Suggested Orders`
    );
  }
}
