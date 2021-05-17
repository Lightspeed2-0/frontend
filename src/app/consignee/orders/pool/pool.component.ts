import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConsigneeserviceService } from "../../consigneeservice.service";

@Component({
  selector: "app-pool",
  templateUrl: "./pool.component.html",
  styleUrls: ["./pool.component.scss"],
})
export class PoolComponent implements OnInit {
  constructor(
    private service: ConsigneeserviceService,
    private router: Router
  ) {}

  Transporters: any[] = [];

  clicked = false;
  loaded = false;

  source: FormGroup = new FormGroup({
    Address: new FormControl(null, Validators.required),
    City: new FormControl(null, Validators.required),
    Pincode: new FormControl(null, Validators.required),
    State: new FormControl(null, Validators.required),
  });

  destination: FormGroup = new FormGroup({
    Address: new FormControl(null, Validators.required),
    City: new FormControl(null, Validators.required),
    Pincode: new FormControl(null, Validators.required),
    State: new FormControl(null, Validators.required),
  });

  transporter: FormGroup = new FormGroup({
    TransporterId: new FormControl(null, Validators.required),
  });

  confirmation: FormGroup = new FormGroup({
    OrderDate: new FormControl(null, Validators.required),
    Volume: new FormControl(null, Validators.required),
    Weight: new FormControl(null, Validators.required),
    IsLTL: new FormControl(null, Validators.required),
  });

  get sourceControls() {
    return this.source.controls;
  }

  get destinationControls() {
    return this.destination.controls;
  }

  get confirmationControls() {
    return this.confirmation.controls;
  }

  ngOnInit(): void {}

  onSource() {
    console.log(this.source.value);
  }

  onSubmit() {
    let isltl = false;
    if (String(this.confirmation.value["IsLTL"]).toLowerCase() === "yes") {
      isltl = true;
    } else {
      isltl = false;
    }
    const data = {
      Source: this.source.value,
      Destination: this.destination.value,
      OrderDate: this.confirmation.value["OrderDate"],
      Volume: this.confirmation.value["Volume"],
      Weight: this.confirmation.value["Weight"],
      IsLTL: isltl,
    };
    console.log(data);
    this.loaded = true;
    this.service.createPool(data).subscribe(
      (res) => {
        this.loaded = false;
        console.log(res);
        if (res.msg === "success") {
          this.service.popup = false;
          this.router.navigateByUrl(
            `/Consignee/${this.service.Username}/View Bids`
          );
        }
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error.msg);
        }
      }
    );
  }
}
