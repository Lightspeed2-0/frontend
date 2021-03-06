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
  selected: any[] = [];
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
  statusGot: any;

  constructor(private serive: DriverService) {}

  getOrder() {
    this.Orders.length = 0;
    this.serive.getOrder().subscribe(
      (res) => {
        this.clicked = false;
        console.log(res);
        this.Orders = res["Orders"];
        if (this.Orders.length > 0) {
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
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

  ngOnInit(): void {
    this.clicked = true;
    this.getOrder();
  }

  getStatus(data: any) {
    const status = this.Status.find((Status) => Status.status === data);
    return status!._id;
  }

  onUpdate(id: string, status: any, index: number) {
    this.updated[index] = true;
    console.log(id, this.statusGot);
    this.serive
      .updateStatus({
        IndentId: id,
        Status: this.getStatus(this.statusGot),
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.clicked = true;
          this.getOrder();
          this.statusForm.reset();
          this.updated[index] = false;
        },
        (error) => {
          // console.error(error.error.msg);
          if (error instanceof HttpErrorResponse) {
            console.error(error.error.msg);
          }
        }
      );
  }
}
