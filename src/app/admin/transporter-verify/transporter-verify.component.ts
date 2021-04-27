import { AdminService } from "./../admin.service";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { PageEvent } from "@angular/material/paginator";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-transporter-verify",
  templateUrl: "./transporter-verify.component.html",
  styleUrls: ["./transporter-verify.component.scss"],
})
export class TransporterVerifyComponent implements OnInit, AfterViewInit {
  error: any;
  pageEvent: any;
  spinner = true;
  accepted = false;
  constructor(
    private service: AdminService,
    private change: ChangeDetectorRef
  ) {}
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
  transporter: any[] = [];
  declined: boolean[] = [];
  nothing = false;
  length = 0;

  randomGradient() {
    return this.gradients[Math.floor(Math.random() * this.gradients.length)];
  }

  ngAfterViewInit() {
    this.service.transporterGet().subscribe(
      (res: any) => {
        this.spinner = false;
        const respose: any[] = res;
        this.transporter = respose;
        if (this.transporter.length === 0) {
          this.nothing = true;
        }
        this.length = this.transporter.length;
        console.log(this.transporter);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status) {
            this.error = error.error["msg"];
          }
        }
      }
    );
    for (let i = 0; i < this.length; i++) {
      this.declined.push(false);
    }
    this.change.detectChanges();
  }
  _id: number = 0;

  ngOnInit() {
    console.log(this.transporter.length);
  }

  onVerified(id: number) {
    this.accepted = true;
    this.service
      .transporterVerify({ _id: id, IsAccepted: this.accepted })
      .subscribe(
        (res) => {
          console.log(res);
          if (res.msg === "success") {
            this.transporter.splice(id, 1);
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
    this.accepted = false;
  }

  onSend() {
    const data = {
      _id: this._id,
      ...this.form.value,
      IsAccepted: this.accepted,
    };
    this.service.transporterDecline(data).subscribe(
      (res) => {
        if (res.msg === "success") {
          this.transporter.splice(this._id, 1);
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
