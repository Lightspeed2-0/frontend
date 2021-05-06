import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.scss"],
})
export class AdminLoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    Username: new FormControl(null, Validators.required),
    Password: new FormControl(null, Validators.required),
  });

  constructor(private http: HttpClient, private router: Router) {}

  error: any;
  clicked = false;

  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {}

  onLogin() {
    this.clicked = true;
    this.http
      .post(
        "https://lightning-backend.herokuapp.com/admin/login",
        this.form.value
      )
      .subscribe(
        (res) => {
          const tokenObj: any = res;
          localStorage.setItem("token", tokenObj.token);
          this.router.navigateByUrl("/Admins");
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status) {
              console.error(error);
              this.error = error.error["msg"];
              this.router.navigateByUrl("/Adminlogin");
            }
          }
        }
      );
  }
}
