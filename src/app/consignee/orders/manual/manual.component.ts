import { HttpErrorResponse } from "@angular/common/http";
import { ConsigneeserviceService } from "./../../consigneeservice.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-manual",
  templateUrl: "./manual.component.html",
  styleUrls: ["./manual.component.scss"],
})
export class ManualComponent implements OnInit {
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

  ngOnInit(): void {}

  onSource() {
    console.log(this.source.value);
  }

  getTrans() {
    this.clicked = true;
    this.service.getTransporter().subscribe(
      (res) => {
        this.clicked = false;
        const tokenObj = res;
        console.log(tokenObj.transporters);
        this.Transporters = tokenObj.transporters;
        console.log(this.Transporters.length);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }

  getId() {
    const data = this.Transporters.find(
      (data) => data.Username === this.transporter.value["TransporterId"]
    );
    return data._id;
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
      TransporterId: this.getId(),
      OrderDate: this.confirmation.value["OrderDate"],
      Volume: this.confirmation.value["Volume"],
      Weight: this.confirmation.value["Weight"],
      IsLTL: isltl,
    };
    console.log(data);
    this.loaded = true;
    this.service.indentCreate(data).subscribe(
      (res) => {
        this.loaded = false;
        console.log(res);
        this.router.navigateByUrl(
          `/Consignee/${this.service.Username}/Your Orders`
        );
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }
}
