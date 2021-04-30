import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
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

  ngOnInit(): void {
    this.isverified = this.verifyService.isVerified[3];
  }

  onRefresh() {
    const transUrl =
      "https://lightning-backend.herokuapp.com/transporter/panstatus";
    const consUrl =
      "https://lightning-backend.herokuapp.com/consignee/panstatus";
    let url = "",
      user = "";
    if (this.route.snapshot.params["user"] === "consignee") {
      url = consUrl;
      user = "Consignee";
    } else {
      url = transUrl;
      user = "Transporter";
    }
    console.log(localStorage.getItem("Email"));
    this.http
      .post(url, {
        Email: localStorage.getItem("Email"),
      })
      .subscribe(
        (res) => {
          console.log("hello");
          const tokenObj: any = res;
          localStorage.setItem("token", tokenObj.token);
          this.router.navigateByUrl(`/${user}/${tokenObj.Username}`);
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
