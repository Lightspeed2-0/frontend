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
  consigneeRegUrl =
    "https://lightning-backend.herokuapp.com/consignee/register";
  // transporterRegUrl =
  //   "https://lightning-backend.herokuapp.com/transporter/register";
  transporterRegUrl = "https://lightning-backend.herokuapp.com/transporter/register";
  consigneeLogin(data: { Email: string; Password: string }) {
    return this.http.post(this.consigneeLoginUrl, data);
  }
  transporterLogin(data: { Email: string; Password: string }) {
    return this.http.post(this.transporterLoginUrl, data);
  }
  consigneeRegister(data: {
    Username: string;
    MobileNo: number;
    Email: string;
    Password: string;
  }) {
    return this.http.post(this.consigneeRegUrl, data);
  }
  transporterRegsiter(data: any) {
    return this.http.post(this.transporterRegUrl, data);
  }
  getToken() {
    return localStorage.getItem("token");
  }
}
