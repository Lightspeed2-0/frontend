import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TransporterService {
  Username = "";
  getRequestUrl =
    "https://lightning-backend.herokuapp.com/transporter/requests";

  requestUrl =
    "https://lightning-backend.herokuapp.com/transporter/respondRequest";

  addDriverUrl =
    "https://lightning-backend.herokuapp.com/transporter/addDriver";

  removeDriverUrl =
    "https://lightning-backend.herokuapp.com/transporter/removeDriver";

  getDriverUrl =
    "https://lightning-backend.herokuapp.com/transporter/getDriver";

  constructor(private http: HttpClient) {}

  getRequest() {
    return this.http.get<any>(this.getRequestUrl);
  }

  putAccept(data: any) {
    console.log(data);
    return this.http.post<any>(this.requestUrl, data);
  }

  putDecline(data: any) {
    return this.http.post<any>(this.requestUrl, data);
  }

  addDriver(data: any) {
    return this.http.post<any>(this.addDriverUrl, data);
  }

  removeDriver(data: any) {
    return this.http.post<any>(this.removeDriverUrl, data);
  }

  getDriver(data: any) {
    return this.http.post<any>(this.getDriverUrl, data);
  }
}
