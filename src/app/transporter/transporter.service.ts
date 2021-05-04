import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TransporterService {
  Username = "";
  private getRequestUrl =
    "https://lightning-backend.herokuapp.com/transporter/requests";

  private requestUrl =
    "https://lightning-backend.herokuapp.com/transporter/respondRequest";

  private addDriverUrl =
    "https://lightning-backend.herokuapp.com/transporter/addDriver";

  private removeDriverUrl =
    "https://lightning-backend.herokuapp.com/transporter/removeDriver";

  private getDriverUrl =
    "https://lightning-backend.herokuapp.com/transporter/getDriver";

  private getOrderUrl =
    "https://lightning-backend.herokuapp.com/transporter/getOrders";

  private orderDeclineUrl =
    "https://lightning-backend.herokuapp.com/transporter/declineOrder";

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

  getOrders() {
    return this.http.get<any>(this.getOrderUrl);
  }

  orderDecline(data: any) {
    return this.http.post<any>(this.orderDeclineUrl, data);
  }
}