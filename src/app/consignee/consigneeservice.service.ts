import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ConsigneeserviceService {
  constructor(private http: HttpClient) {}

  popup = false;
  UserProfile = false;
  Username = "";
  poolIndent: any;

  private getTransporterUrl =
    "https://lightning-backend.herokuapp.com/consignee/getTransporter";

  private indentUrl =
    "https://lightning-backend.herokuapp.com/consignee/createIndent";

  private getOrderUrl =
    "https://lightning-backend.herokuapp.com/consignee/yourOrders";

  private getConsigneeUrl =
    "https://lightning-backend.herokuapp.com/transporter/viewConsignee";

  private amountUrl =
    "https://lightning-backend.herokuapp.com/consignee/indentConfirm";

  private canelOrderUrl =
    "https://lightning-backend.herokuapp.com/consignee/cancelOrder";

  private createBidUrl =
    "https://lightning-backend.herokuapp.com/consignee/createBid";

  private viewBidUrl =
    "https://lightning-backend.herokuapp.com/consignee/viewBids";

  private acceptBidUrl =
    "https://lightning-backend.herokuapp.com/consignee/acceptBid";

  private closeBidUrl =
    "https://lightning-backend.herokuapp.com/consignee/closeBid";

  private createPoolUrl =
    "https://lightning-backend.herokuapp.com/consignee/createPool";

  private getPoolUrl =
    "https://lightning-backend.herokuapp.com/consignee/getPool";

  private recommendPoolUrl =
    "https://lightning-backend.herokuapp.com/consignee/recommendPool";

  getTransporter() {
    return this.http.get<any>(this.getTransporterUrl);
  }

  indentCreate(data: any) {
    return this.http.post<any>(this.indentUrl, data);
  }

  getOrder() {
    return this.http.get<any>(this.getOrderUrl);
  }

  getConsignee(data: any) {
    return this.http.post<any>(this.getConsigneeUrl, data);
  }

  postPayment(data: any) {
    return this.http.post<any>(this.amountUrl, data);
  }

  postDecline(data: any) {
    return this.http.post<any>(this.amountUrl, data);
  }

  cancelOrder(data: any) {
    return this.http.post<any>(this.canelOrderUrl, data);
  }

  bidCreate(data: any) {
    return this.http.post<any>(this.createBidUrl, data);
  }

  viewBids() {
    return this.http.get<any>(this.viewBidUrl);
  }

  acceptBid(data: any) {
    return this.http.post<any>(this.acceptBidUrl, data);
  }

  closeBid(data: any) {
    return this.http.post<any>(this.closeBidUrl, data);
  }

  createPool(data: any) {
    return this.http.post<any>(this.createPoolUrl, data);
  }

  getPool() {
    return this.http.get<any>(this.getPoolUrl);
  }

  recommendPool(data: any) {
    return this.http.post<any>(this.recommendPoolUrl, data);
  }
}
