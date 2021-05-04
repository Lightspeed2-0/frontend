import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TransporterService } from "../transporter.service";

@Component({
  selector: "app-driveradd",
  templateUrl: "./driveradd.component.html",
  styleUrls: ["./driveradd.component.scss"],
})
export class DriveraddComponent implements OnInit {
  clicked = false;
  form: FormGroup = new FormGroup({
    Username: new FormControl(null, Validators.required),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    MobileNo: new FormControl(null, Validators.required),
    DrivingLicense: new FormControl(null, Validators.required),
    Password: new FormControl(null, Validators.required),
  });

  constructor(private serivce: TransporterService) {}

  ngOnInit(): void {}

  onAdd() {
    this.clicked = true;
    this.serivce.addDriver(this.form.value).subscribe(
      (res) => {
        console.log(res);
        this.clicked = false;
        this.form.reset();
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }
}
