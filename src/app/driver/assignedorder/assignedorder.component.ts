import { HttpErrorResponse } from "@angular/common/http";
import { DriverService } from "./../driver.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-assignedorder",
  templateUrl: "./assignedorder.component.html",
  styleUrls: ["./assignedorder.component.scss"],
})
export class AssignedorderComponent implements OnInit {
  clicked = false;
  isEmpty = true;
  panelOpenState = false;
  Orders: any[] = [];

  constructor(private serive: DriverService) {}

  ngOnInit(): void {
    this.clicked = true;
    this.serive.getOrder().subscribe(
      (res) => {
        this.clicked = false;
        console.log(res);
        this.Orders = res["Orders"];
        if (this.Orders.length > 0) {
          this.isEmpty = false;
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
