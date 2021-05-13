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

  private allocateDriverUrl =
    "https://lightning-backend.herokuapp.com/transporter/allocateDriver";

  private cancelOrderUrl =
    "https://lightning-backend.herokuapp.com/transporter/cancelOrder";

  private getBidUrl =
    "https://lightning-backend.herokuapp.com/transporter/getBids";

  private acceptBidUrl =
    "https://lightning-backend.herokuapp.com/transporter/didBid";

  private myBidsUrl =
    "https://lightning-backend.herokuapp.com/transporter/didBid";

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

  getDriver() {
    return this.http.get<any>(this.getDriverUrl);
  }

  getOrders() {
    return this.http.get<any>(this.getOrderUrl);
  }

  orderDecline(data: any) {
    return this.http.post<any>(this.orderDeclineUrl, data);
  }

  allocateDriver(data: any) {
    return this.http.post<any>(this.allocateDriverUrl, data);
  }

  cancelOrder(data: any) {
    return this.http.post<any>(this.cancelOrderUrl, data);
  }

  getBid() {
    return this.http.get<any>(this.getBidUrl);
  }

  acceptBid(data: any) {
    return this.http.post<any>(this.acceptBidUrl, data);
  }

  myBid() {
    return this.http.get<any>(this.myBidsUrl);
  }
}
