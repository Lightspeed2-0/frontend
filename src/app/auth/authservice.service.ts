import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AuthserviceService {
  private consigneeLoginUrl =
    "https://lightning-backend.herokuapp.com/consignee/login";

  private transporterLoginUrl =
    "https://lightning-backend.herokuapp.com/transporter/login";

  private driverLoginUrl =
    "https://lightning-backend.herokuapp.com/driver/login";

  private consigneeRegUrl =
    "https://lightning-backend.herokuapp.com/consignee/register";

  private transporterRegUrl =
    "https://lightning-backend.herokuapp.com/transporter/register";

  private sendContactUrl =
    "https://lightning-backend.herokuapp.com/contactForm";

  constructor(private http: HttpClient) {}

  consigneeLogin(data: { Email: string; Password: string }) {
    return this.http.post<any>(this.consigneeLoginUrl, data);
  }

  transporterLogin(data: { Email: string; Password: string }) {
    return this.http.post<any>(this.transporterLoginUrl, data);
  }

  driverLogin(data: any) {
    return this.http.post<any>(this.driverLoginUrl, data);
  }

  consigneeRegister(data: any) {
    return this.http.post<any>(this.consigneeRegUrl, data);
  }

  transporterRegsiter(data: any) {
    return this.http.post<any>(this.transporterRegUrl, data);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  sendContact(data: any) {
    return this.http.post<any>(this.sendContactUrl, data);
  }
}
