import { VerfiyserviceService } from "./../verify-auth/verfiyservice.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-otp",
  templateUrl: "./otp.component.html",
  styleUrls: ["./otp.component.scss"],
})
export class OtpComponent implements OnInit {
  clicked = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private verifyService: VerfiyserviceService
  ) {}

  form: FormGroup = new FormGroup({
    OTP: new FormControl(null, Validators.required),
  });

  Email: string = "";
  error: any;

  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.Email = this.route.snapshot.params["email"];
    console.log(this.Email);
  }

  onClose() {
    this.clicked = false;
    this.error = null;
    this.form.reset();
  }

  tokenObj: any;

  onSubmit() {
    this.clicked = true;
    const role = this.route.snapshot.params["role"];
    this.verifyService.role = role;
    const transUrl =
      "https://lightning-backend.herokuapp.com/transporter/verify";
    const consUrl = "https://lightning-backend.herokuapp.com/consignee/verify";
    let url = "";
    console.log(typeof this.route.snapshot.params["role"]);
    if (this.route.snapshot.params["role"] === "0") {
      url = consUrl;
    } else {
      url = transUrl;
    }
    this.http
      .post(url, {
        Email: this.Email,
        ...this.form.value,
      })
      .subscribe(
        (res) => {
          this.tokenObj = res;
          console.log(this.tokenObj.msg);
          this.verifyService.isVerified[2] = true;
          if (this.tokenObj.msg === "nopan") {
            if (this.route.snapshot.params["role"] === "0") {
              this.router.navigate(["pan/consignee"], {
                relativeTo: this.route,
              });
            } else {
              this.router.navigate(["pan/transporter"], {
                relativeTo: this.route,
              });
            }
          }
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log(error.error);
              this.error = error.error;
              this.router.navigateByUrl(`/Verify/${this.Email}/${role}`);
            }
            if (error.status === 400) {
              console.log(error.error);
              this.error = error.error;
              this.router.navigateByUrl(`/Verify/${this.Email}/${role}`);
            }
          }
        }
      );
  }
}
