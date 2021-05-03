import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TransporterService } from "../transporter.service";

@Component({
  selector: "app-transprofile",
  templateUrl: "./transprofile.component.html",
  styleUrls: ["./transprofile.component.scss"],
})
export class TransprofileComponent implements OnInit {
  constructor(private router: Router, private service: TransporterService) {}

  Username = this.service.Username;

  ngOnInit(): void {}

  onClose() {
    this.router.navigateByUrl(`/Transporter/${this.Username}`);
  }
}
