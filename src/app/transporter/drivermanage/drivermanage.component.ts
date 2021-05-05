import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TransporterService } from "../transporter.service";

@Component({
  selector: "app-drivermanage",
  templateUrl: "./drivermanage.component.html",
  styleUrls: ["./drivermanage.component.scss"],
})
export class DrivermanageComponent implements OnInit {
  loaded = false;
  panelOpenState = false;
  Drivers: any[] = [];
  isEmpty = true;
  constructor(private service: TransporterService) {}

  ngOnInit(): void {
    this.service.getDriver().subscribe(
      (res) => {
        this.Drivers = res["drivers"];
        if (this.Drivers.length > 0) {
          this.isEmpty = false;
        }
        console.log(this.Drivers);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }

  onDecline(id: string, index: number) {
    this.service.removeDriver({ _id: id }).subscribe(
      (res) => {
        console.log(res);
        if (res.msg === "removed") {
          this.Drivers.splice(index, 1);
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }
}
