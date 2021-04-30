import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-transporter",
  templateUrl: "./transporter.component.html",
  styleUrls: ["./transporter.component.scss"],
})
export class TransporterComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  Username = this.route.snapshot.params["username"];
  profile = false;
  ngOnInit(): void {}
  onProfile() {
    this.profile = !this.profile;
  }
  logOut() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/Login");
  }
}
