import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TransporterService } from "../transporter.service";

@Component({
  selector: "app-pooling-requests",
  templateUrl: "./pooling-requests.component.html",
  styleUrls: ["./pooling-requests.component.scss"],
})
export class PoolingRequestsComponent implements OnInit {
  constructor(private service: TransporterService) {}

  form: FormGroup = new FormGroup({
    Amount: new FormControl(null, Validators.required),
  });

  Req: any[] = [];
  accept: any[] = [];
  clicked: any[] = [];
  dclicked: any[] = [];

  loaded = false;
  panelOpenState = false;
  Isaccepted = false;
  isEmpty = true;

  getRequest() {
    this.Req.length = 0;
    this.service.getPoolRequest().subscribe(
      (res) => {
        this.loaded = false;
        console.log(res);
        const response = res;
        this.Req = response["requests"];
        console.log(this.Req);

        if (this.Req.length > 0) {
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }

        this.accept.length = this.Req.length;
        this.accept.fill(false);

        for (let i = 0; i < this.Req.length; i++) {
          if (this.Req[i].Status === 5) {
            this.clicked.push(false);
            this.dclicked.push(false);
          }
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
    this.loaded = true;
    this.getRequest();
  }

  onAccept(index: number) {
    this.accept[index] = true;
    // this.clicked[index] = true;
    this.Isaccepted = true;
  }

  onDecline(id: string, index: number) {
    this.Isaccepted = false;
    this.dclicked[index] = true;
    const data = { RequestId: id, IsAccepted: this.Isaccepted };
    this.service.putDecline(data).subscribe(
      (res) => {
        console.log(res);
        this.loaded = true;
        this.getRequest();
        // this.Req.splice(index, 1);
        // this.accept.splice(index, 1);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }

  onBack(index: number) {
    this.accept[index] = false;
  }

  enterAmount(requestid: string, indentid: string, index: number) {
    const data = {
      PoolingRequestId: requestid,
      IndentId: indentid,
      ...this.form.value,
      IsAccepted: this.Isaccepted,
    };
    this.clicked[index] = true;
    // console.log(data);
    this.service.accpetPool(data).subscribe(
      (res) => {
        console.log(res);
        this.clicked[index] = false;
        if (res.msg === "success") {
          // this.Req.splice(index, 1);
          this.loaded = true;
          this.getRequest();
          // this.accept.splice(index, 1);
          this.form.reset();
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }

  onAppend(
    indentid: string,
    orderid: string,
    poolrequestid: string,
    index: number
  ) {
    this.clicked[index] = true;
    this.service
      .appendOrder({
        OrderId: orderid,
        IndentId: indentid,
        PoolingRequestId: poolrequestid,
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.loaded = true;
          this.getRequest();
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            console.error(error.error);
          }
        }
      );
  }
}
