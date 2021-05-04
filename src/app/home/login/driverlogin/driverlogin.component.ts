import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthserviceService } from "src/app/auth/authservice.service";

@Component({
  selector: "app-driverlogin",
  templateUrl: "./driverlogin.component.html",
  styleUrls: ["./driverlogin.component.scss"],
})
export class DriverloginComponent implements OnInit {
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
  onClose() {
    this.error = null;
    this.clicked = false;
    this.form.reset();
  }
  onLogin() {
    this.clicked = true;
    this.auth.driverLogin(this.form.value).subscribe(
      (res) => {
        this.clicked = false;
        this.tokenObj = res;
        localStorage.setItem("token", this.tokenObj.token);
        this.router.navigateByUrl(`/Driver/${this.tokenObj.Username}`);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.error = error.error.msg;
          console.log(error);
        }
      }
    );
  }
}
