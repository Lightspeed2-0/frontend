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
    TotalWeight: new FormControl(null, Validators.required),
    TotalVolume: new FormControl(null, Validators.required),
    TruckNumber: new FormControl(null, Validators.required),
  });

  Req: any[] = [];
  Drivers: any[] = [];
  accept: any[] = [];
  clicked: any[] = [];
  dclicked: any[] = [];

  loaded = false;
  panelOpenState = false;
  Isaccepted = false;
  isEmpty = true;

  constructor(private service: TransporterService) {}

  getRequest() {
    this.Req.length = 0;
    this.service.getRequest().subscribe(
      (res) => {
        this.loaded = false;
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
          console.error(error);
        }
      }
    );
  }

  ngOnInit(): void {
    this.loaded = true;

    this.getRequest();

    this.service.getDriver().subscribe(
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
    this.clicked[index] = true;
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

  getDriverid(data: string) {
    const driver = this.Drivers.find((driver) => driver.Username === data);
    return driver._id;
  }

  onAllocate(requestId: string, index: number) {
    this.clicked[index] = true;
    this.service
      .allocateDriver({
        DriverId: this.getDriverid(this.driverForm.value["DriverId"]),
        TotalWeight: this.driverForm.value["TotalWeight"],
        TotalVolume: this.driverForm.value["TotalVolume"],
        VehicleNo: this.driverForm.value["TruckNumber"],
        RequestId: requestId,
      })
      .subscribe(
        (res) => {
          this.clicked[index] = false;
          this.loaded = true;
          this.getRequest();
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
