import { ActivatedRoute } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class VerfiyserviceService {
  isVerified = [true, true, false, false];
  constructor(private route: ActivatedRoute) {}
  email = this.route.snapshot.params["email"];
}
