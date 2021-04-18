import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthserviceService } from "src/app/auth/authservice.service";

@Component({
  selector: "app-consigneesignup",
  templateUrl: "./consigneesignup.component.html",
  styleUrls: ["./consigneesignup.component.scss"],
})
export class ConsigneesignupComponent implements OnInit {
  clicked = false;
  error: any;
  private Response: any;
  private user: any;
  private tokenObj: any;
  form: FormGroup = new FormGroup({
    Username: new FormControl(null, Validators.required),
    MobileNo: new FormControl(null, Validators.required),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, Validators.required),
    PanCard: new FormControl(null, Validators.required),
  });
  constructor(private auth: AuthserviceService, private router: Router) {}
  ngOnInit(): void {}
  onClose() {
    this.error = null;
    this.form.reset();
  }
  onLogin() {
    this.clicked = true;
    this.user = this.form.value;
    console.log(this.user);
    this.auth.consigneeRegister(this.user).subscribe(
      (res) => {
        this.Response = res;
        this.router.navigateByUrl(`/Verify/${this.Response.Email}`);
        console.log(this.Response.Email);
      },
      (error) => {
        this.clicked = false;
        console.log(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status) {
            this.error = error.error["msg"];
            this.router.navigateByUrl("/Signup");
          }
        }
      }
    );
  }
}
