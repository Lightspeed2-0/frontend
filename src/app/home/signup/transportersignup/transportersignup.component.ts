import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthserviceService } from "src/app/auth/authservice.service";

@Component({
  selector: "app-transportersignup",
  templateUrl: "./transportersignup.component.html",
  styleUrls: ["./transportersignup.component.scss"],
})
export class TransportersignupComponent implements OnInit {
  error: any;
  panError: any;
  tinError: any;
  clicked = false;
  panChanged = false;
  tinChanged = false;
  private panCard: any;
  private tinCard: any;
  private user: any;
  private tokenObj: any;
  form: FormGroup = new FormGroup({
    Username: new FormControl(null, Validators.required),
    MobileNo: new FormControl(null, Validators.required),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Password: new FormControl(null, Validators.required),
    PanCardNo: new FormControl(null, Validators.required),
  });

  constructor(private auth: AuthserviceService, private router: Router) {}

  get formControls() {
    return this.form.controls;
  }

  onClose() {
    this.clicked = false;
    this.error = null;
    this.form.reset();
  }

  onError() {
    this.panError = null;
    this.tinError = null;
    this.panCard = null;
    this.tinCard = null;
  }

  ngOnInit(): void {}

  onPan(event: any) {
    this.panCard = <File>event.target.files[0];
    console.log(this.panCard["type"]);
    if (this.panCard["type"] === "application/pdf") {
      this.panChanged = true;
    } else {
      this.panError = "Upload only PDF files";
    }
  }

  onTin(event: any) {
    this.tinCard = <File>event.target.files[0];
    console.log(this.tinCard["type"]);
    if (
      this.panChanged &&
      this.form.valid &&
      this.tinCard["type"] === "application/pdf"
    ) {
      this.tinChanged = true;
    } else {
      this.tinError = "Upload only PDF files or form is empty";
    }
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
    data.append("TinCard", this.tinCard);

    data.forEach((key, value) => console.log(key, " : ", value));

    this.auth.transporterRegsiter(data).subscribe(
      (res) => {
        console.log(res);
        this.tokenObj = res;
        localStorage.setItem("Email", this.form.value["Email"]);
        localStorage.setItem("token", this.tokenObj.token);
        this.router.navigateByUrl(`/Verify/${this.form.value["Email"]}/1`);
      },
      (error) => {
        this.clicked = false;
        if (error instanceof HttpErrorResponse) {
          if (error.status) {
            this.error = error.error["msg"];
            this.router.navigateByUrl("/Signup/TransporterSignup");
          }
        }
      }
    );
  }
}
