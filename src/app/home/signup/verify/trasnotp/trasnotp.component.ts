import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-trasnotp",
  templateUrl: "./trasnotp.component.html",
  styleUrls: ["./trasnotp.component.scss"],
})
export class TrasnotpComponent implements OnInit {
  clicked = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}
  form: FormGroup = new FormGroup({
    OTP: new FormControl(null, Validators.required),
  });
  Email: string = "";
  error: any;
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
    const transUrl =
      "https://lightning-backend.herokuapp.com/transporter/verify";
    const consUrl = "https://lightning-backend.herokuapp.com/consignee/verify";
    let url = "";
    console.log(this.route.snapshot.params["role"]);
    if (this.route.snapshot.params["role"] === 0) {
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
          localStorage.setItem("token", this.tokenObj.token);
          this.router.navigateByUrl("/Transporter");
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              console.log(error.error);
              this.error = error.error;
              this.router.navigateByUrl(`/Verify/${this.Email}`);
            }
            if (error.status === 400) {
              console.log(error.error);
              this.error = error.error;
              this.router.navigateByUrl(`/Verify/${this.Email}`);
            }
          }
        }
      );
  }
}
