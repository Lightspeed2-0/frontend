import { ConsigneeserviceService } from "./consigneeservice.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
} from "@angular/core";

@Component({
  selector: "app-consignee",
  templateUrl: "./consignee.component.html",
  styleUrls: ["./consignee.component.scss"],
})
export class ConsigneeComponent implements OnInit, AfterContentChecked {
  image: any;
  profile = false;
  popup = false;
  constructor(
    private router: Router,
    private service: ConsigneeserviceService,
    private route: ActivatedRoute
  ) {}
  Username = this.route.snapshot.params["Username"];

  ngOnInit(): void {}
  ngAfterContentChecked() {
    this.popup = this.service.popup;
  }

  onProfile() {
    this.profile = !this.profile;
  }

  logOut() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/Login");
  }
}
