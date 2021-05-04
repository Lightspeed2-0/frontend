import { ActivatedRoute } from "@angular/router";
import { ConsigneeserviceService } from "./../consigneeservice.service";
import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: ConsigneeserviceService
  ) {}
  loaded = false;
  User: any = {};
  Username = this.service.Username;
  id = this.route.snapshot.params["id"];
  ngOnInit(): void {
    this.service.getConsignee({ ConsigneeId: this.id }).subscribe(
      (res) => {
        this.User = res["consignee"];
        console.log(res);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }
}
