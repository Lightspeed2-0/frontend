import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AuthserviceService {
  constructor(private http: HttpClient) {}
  consigneeLoginUrl = "https://lightning-backend.herokuapp.com/consignee/login";
  transporterLoginUrl =
    "https://lightning-backend.herokuapp.com/transporter/login";
  driverLoginUrl = "https://lightning-backend.herokuapp.com/driver/login";
  consigneeRegUrl =
    "https://lightning-backend.herokuapp.com/consignee/register";
  transporterRegUrl =
    "https://lightning-backend.herokuapp.com/transporter/register";

  consigneeLogin(data: { Email: string; Password: string }) {
    return this.http.post(this.consigneeLoginUrl, data);
  }

  transporterLogin(data: { Email: string; Password: string }) {
    return this.http.post(this.transporterLoginUrl, data);
  }

  driverLogin(data: any) {
    return this.http.post<any>(this.driverLoginUrl, data);
  }

  consigneeRegister(data: any) {
    return this.http.post(this.consigneeRegUrl, data);
  }

  transporterRegsiter(data: any) {
    return this.http.post(this.transporterRegUrl, data);
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
