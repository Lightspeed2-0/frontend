import { HttpErrorResponse } from "@angular/common/http";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminService } from "../admin.service";

@Component({
  selector: "app-consignee-verify",
  templateUrl: "./consignee-verify.component.html",
  styleUrls: ["./consignee-verify.component.scss"],
})
export class ConsigneeVerifyComponent implements OnInit, AfterViewInit {
  error: any;
  pageEvent: any;
  spinner = true;
  accepted = false;
  gradient: any;
  form: FormGroup = new FormGroup({
    msg: new FormControl(null, Validators.required),
  });
  gradients = [
    "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
    "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
    "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
    "linear-gradient(to right, #ec008c, #fc6767)",
    "linear-gradient(to right, #9796f0, #fbc7d4)",
    "linear-gradient(to right, #acb6e5, #86fde8)",
    "linear-gradient(to right, #ffe259, #ffa751)",
  ];

  consignee: any[] = [];
  declined: boolean[] = [];
  nothing = false;
  length = 0;

  constructor(
    private service: AdminService,
    private change: ChangeDetectorRef,
    private snack: MatSnackBar
  ) {}

  randomGradient() {
    return this.gradients[Math.floor(Math.random() * this.gradients.length)];
  }

  getConsignee() {
    this.service.consigneeGet().subscribe(
      (res: any) => {
        this.spinner = false;
        const respose: any[] = res;
        this.consignee = respose;
        if (this.consignee.length === 0) {
          this.nothing = true;
        }
        this.length = this.consignee.length;
        console.log(this.consignee);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status) {
            this.error = error.error["msg"];
          }
        }
      }
    );
  }

  ngAfterViewInit() {
    this.getConsignee();
    for (let i = 0; i < this.length; i++) {
      this.declined.push(false);
    }
    this.change.detectChanges();
  }
  _id: number = 0;

  ngOnInit() {}

  onVerified(id: number) {
    this.accepted = true;
    this.snack.open("Verified Successfully !", "𝘅", {
      duration: 900,
      panelClass: ["white-snackbar"],
    });
    this.service
      .consigneeVerify({ _id: id, IsAccepted: this.accepted })
      .subscribe(
        (res) => {
          console.log(res);
          if (res.msg === "success") {
            this.getConsignee();
            // this.consignee.splice(id, 1);
          }
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            console.error(error);
          }
        }
      );
  }

  onDecline(id: number, index: number) {
    this._id = id;
    this.declined[index] = true;
  }

  onSend() {
    const data = {
      _id: this._id,
      ...this.form.value,
      IsAccepted: this.accepted,
    };
    this.snack.open("Declined Successfully !", "", {
      duration: 900,
      panelClass: ["red-snackbar"],
    });
    this.service.consigneeDecline(data).subscribe(
      (res) => {
        console.log(res);
        if (res.msg === "success") {
          this.consignee.splice(this._id, 1);
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
