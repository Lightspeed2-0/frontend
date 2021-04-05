import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.component.html",
  styleUrls: ["./verify.component.scss"],
})
export class VerifyComponent implements OnInit {
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
  tokenObj: any;
  onSubmit() {
    this.http
      .post("https://lightning-backend.herokuapp.com/consignee/verify", {
        Email: this.Email,
        ...this.form.value,
      })
      .subscribe(
        (res) => {
          this.tokenObj = res;
          localStorage.setItem("token", this.tokenObj.token);
          this.router.navigateByUrl("/Consignee");
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
