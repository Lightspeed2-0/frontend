import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthserviceService } from "src/app/auth/authservice.service";

@Component({
  selector: "app-consigneesignup",
  templateUrl: "./consigneesignup.component.html",
  styleUrls: ["./consigneesignup.component.scss"],
})
export class ConsigneesignupComponent implements OnInit {
  error: any;
  private user: {
    Username: string;
    MobileNo: number;
    Email: string;
    Password: string;
  } = {
    Username: "",
    MobileNo: 0,
    Email: "",
    Password: "",
  };
  private tokenObj: any;
  form: FormGroup = new FormGroup({
    Username: new FormControl(null, Validators.required),
    MobileNo: new FormControl(null, Validators.required),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, Validators.required),
  });
  constructor(private auth: AuthserviceService, private router: Router) {}

  ngOnInit(): void {}
  onClose() {
    this.error = null;
    this.form.reset();
  }
  onLogin() {
    this.user = this.form.value;
    this.auth.consigneeRegister(this.user).subscribe(
      (res) => {
        console.log(res);
        this.tokenObj = res;
        localStorage.setItem("token", this.tokenObj.token);
        this.router.navigateByUrl(`/Consignee`);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.error = error.message;
            this.router.navigateByUrl("/Signup");
          }
        }
      }
    );
  }
}
