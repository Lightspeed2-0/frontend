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
  onClose() {
    this.error = null;
    this.form.reset();
  }
  onLogin() {
    this.user = this.form.value;
    this.auth.transporterLogin(this.user).subscribe(
      (res) => {
        console.log(res);
        this.tokenObj = res;
        localStorage.setItem("token", this.tokenObj.token);
        this.router.navigateByUrl(`/Transporter`);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.error = error.message;
            this.router.navigateByUrl("/Login/TransporterLogin");
          }
        }
      }
    );
  }
}
