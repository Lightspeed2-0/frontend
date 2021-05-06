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
  panError: any;
  private Response: any;
  private panCard: any;
  panChanged = false;

  form: FormGroup = new FormGroup({
    Username: new FormControl(null, Validators.required),
    MobileNo: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, Validators.required),
    PanCardNo: new FormControl(null, Validators.required),
  });

  constructor(private auth: AuthserviceService, private router: Router) {}

  ngOnInit(): void {}

  get formControls() {
    return this.form.controls;
  }

  onClose() {
    this.error = null;
    this.form.reset();
  }

  onLogin() {
    this.clicked = true;
    const data = new FormData();
    data.append("Username", this.form.value["Username"]);
    data.append("MobileNo", this.form.value["MobileNo"]);
    data.append("Email", this.form.value["Email"]);
    data.append("Password", this.form.value["Password"]);
    data.append("PanCardNo", this.form.value["PanCardNo"]);
    data.append("PanCard", this.panCard);

    data.forEach((key, value) => console.log(key, " : ", value));

    this.auth.consigneeRegister(data).subscribe(
      (res) => {
        this.Response = res;
        localStorage.setItem("Email", this.form.value["Email"]);
        this.router.navigateByUrl(`/Verify/${this.Response.Email}/0`);
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

  onError() {
    this.panError = null;
    this.panCard = null;
    this.form.reset();
  }

  onPan(event: any) {
    this.panCard = <File>event.target.files[0];
    console.log(this.panCard["type"]);
    if (this.panCard["type"] === "application/pdf" && this.form.valid) {
      this.panChanged = true;
    } else {
      this.panError = "Upload only PDF files or check the form";
    }
  }
}
