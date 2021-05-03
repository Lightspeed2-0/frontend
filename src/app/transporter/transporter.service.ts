import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TransporterService {
  Username = "";
  getRequestUrl =
    "https://lightning-backend.herokuapp.com/transporter/requests";

  constructor(private http: HttpClient) {}

  getRequest() {
    return this.http.get<any>(this.getRequestUrl);
  }
}
