import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TransporterService } from "../transporter.service";

@Component({
  selector: "app-request",
  templateUrl: "./request.component.html",
  styleUrls: ["./request.component.scss"],
})
export class RequestComponent implements OnInit {
  form: FormGroup = new FormGroup({
    Amount: new FormControl(null, Validators.required),
  });

  driverForm: FormGroup = new FormGroup({
    DriverId: new FormControl(null, Validators.required),
  });

  Req: any[] = [];
  Drivers: any[] = [];
  accept: any[] = [];

  loaded = false;
  panelOpenState = false;
  Isaccepted = false;
  clicked: any[] = [];
  dclicked: any[] = [];

  constructor(private service: TransporterService) {}

  ngOnInit(): void {
    this.loaded = true;
    this.service.getRequest().subscribe(
      (res) => {
        this.loaded = false;
        const response = res;
        this.Req = response["requests"];
        console.log(this.Req);

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
          console.error(error);
        }
      }
    );

    this.service.getDriver({ msg: "hello" }).subscribe(
      (res) => {
        console.log(res);
        this.Drivers = res["drivers"];
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }

  onAccept(index: number) {
    this.accept[index] = true;
    this.Isaccepted = true;
  }

  onDecline(id: string, index: number) {
    this.Isaccepted = false;
    const data = { RequestId: id, IsAccepted: this.Isaccepted };
    this.service.putDecline(data).subscribe(
      (res) => {
        console.log(res);
        this.Req.splice(index, 1);
        this.accept.splice(index, 1);
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

  enterAmount(id: string, index: number) {
    const data = {
      RequestId: id,
      ...this.form.value,
      IsAccepted: this.Isaccepted,
    };
    // console.log(data);
    this.service.putAccept(data).subscribe(
      (res) => {
        console.log(res);
        this.Req.splice(index, 1);
        this.accept.splice(index, 1);
        this.form.reset();
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }

  getDriverid(data: string) {
    const driver = this.Drivers.find((driver) => driver.Username === data);
    return driver._id;
  }

  onAllocate(requestId: string, index: number) {
    this.clicked[index] = true;
    this.service
      .allocateDriver({
        DriverId: this.getDriverid(this.driverForm.value["DriverId"]),
        RequestId: requestId,
      })
      .subscribe(
        (res) => {
          this.clicked[index] = false;
          console.log(res);
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            console.error(error);
          }
        }
      );
  }
}
