import { Router } from "@angular/router";
import { AuthserviceService } from "./../../../auth/authservice.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-transporterlogin",
  templateUrl: "./transporterlogin.component.html",
  styleUrls: ["./transporterlogin.component.scss"],
})
export class TransporterloginComponent implements OnInit {
  clicked = false;
  error: any;
  form: FormGroup = new FormGroup({
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, Validators.required),
  });

  private user: { Email: string; Password: string } = {
    Email: "",
    Password: "",
  };

  private tokenObj: any;

  constructor(private auth: AuthserviceService, private router: Router) {}

  ngOnInit(): void {}

  get formControl() {
    return this.form.controls;
  }

  onClose() {
    this.error = null;
    this.clicked = false;
    this.form.reset();
  }

  onLogin() {
    this.clicked = true;
    this.user = this.form.value;
    this.auth.transporterLogin(this.user).subscribe(
      (res) => {
        console.log(res);
        this.clicked = false;
        this.tokenObj = res;
        localStorage.setItem("Email", this.form.value["Email"]);
        localStorage.setItem("token", this.tokenObj.token);
        this.router.navigateByUrl(`/Transporter/${this.tokenObj.Username}`);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status) {
            this.error = error.error.msg;
            this.clicked = false;
            if (this.error === "nootp") {
              localStorage.setItem("Email", this.form.value["Email"]);
              this.router.navigateByUrl(`/Verify/${this.user.Email}/1`);
            } else if (this.error === "nopan") {
              localStorage.setItem("Email", this.form.value["Email"]);
              this.router.navigateByUrl(
                `/Verify/${this.user.Email}/1/pan/transporter`
              );
            } else {
              this.router.navigateByUrl("/Login/TransporterLogin");
            }
          }
        }
      }
    );
  }
}
