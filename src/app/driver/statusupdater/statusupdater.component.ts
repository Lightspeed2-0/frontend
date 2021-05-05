import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { DriverService } from "../driver.service";

@Component({
  selector: "app-statusupdater",
  templateUrl: "./statusupdater.component.html",
  styleUrls: ["./statusupdater.component.scss"],
})
export class StatusupdaterComponent implements OnInit {
  clicked = false;
  isEmpty = true;
  panelOpenState = false;
  Orders: any[] = [];
  Status: { _id: number; status: string }[] = [
    { _id: 0, status: "Driver Assigned" },
    { _id: 1, status: "Vehicle Reached" },
    { _id: 2, status: "Order Picked Up" },
    { _id: 3, status: "Order Dispatched" },
    { _id: 4, status: "Order Delivered" },
  ];
  updated: any[] = [];

  statusForm: FormGroup = new FormGroup({
    Status: new FormControl(null, Validators.required),
  });

  constructor(private serive: DriverService) {}

  ngOnInit(): void {
    this.clicked = true;
    this.serive.getOrder().subscribe(
      (res) => {
        this.clicked = false;
        console.log(res);
        this.Orders += res["Orders"];
        if (this.Orders.length > 0) {
          this.isEmpty = false;
        }
        console.log(this.Status);
        this.updated.length = this.Orders.length;
        this.updated.fill(false);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }

  getStatus(data: any) {
    const status = this.Status.find((Status) => Status.status === data);
    return status!._id;
  }

  onUpdate(id: string, index: number) {
    this.serive
      .updateStatus({
        _id: id,
        Status: this.getStatus(this.statusForm.value["Status"]),
      })
      .subscribe(
        (res) => {
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
