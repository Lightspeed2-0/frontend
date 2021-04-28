import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ComponentFactoryResolver, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { VerfiyserviceService } from "../verify-auth/verfiyservice.service";

@Component({
  selector: "app-pancard",
  templateUrl: "./pancard.component.html",
  styleUrls: ["./pancard.component.scss"],
})
export class PancardComponent implements OnInit {
  constructor(
    private verifyService: VerfiyserviceService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  isverified = false;
  error: any = "Pancard verification is pending";
  role: any;
  ngOnInit(): void {
    this.isverified = this.verifyService.isVerified[3];
    this.role = this.route.snapshot.params["role"];
    console.log(this.role);
  }
  onRefresh() {
    const role = this.route.snapshot.params["role"];
    console.log(role);
    const transUrl =
      "https://lightning-backend.herokuapp.com/transporter/panstatus";
    const consUrl =
      "https://lightning-backend.herokuapp.com/consignee/panstatus";
    let url = "";
    console.log(this.verifyService.role);
    if (this.verifyService.role === "0") {
      url = consUrl;
    } else {
      url = transUrl;
    }
    this.http
      .post(url, {
        Email: this.route.snapshot.params["email"],
      })
      .subscribe(
        (res) => {
          const tokenObj: any = res;
          localStorage.setItem("token", tokenObj.token);
          this.router.navigateByUrl(`/Transporter/${tokenObj.Username}`);
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status) {
              this.error = error.error.msg;
              console.error(error.error.msg);
            }
          }
        }
      );
  }
}
