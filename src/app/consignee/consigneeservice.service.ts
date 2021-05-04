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
  private getTransporterUrl =
    "https://lightning-backend.herokuapp.com/consignee/getTransporter";
  private indentUrl =
    "https://lightning-backend.herokuapp.com/consignee/createIndent";
  private getOrderUrl =
    "https://lightning-backend.herokuapp.com/consignee/yourOrders";
  private getConsigneeUrl =
    "https://lightning-backend.herokuapp.com/transporter/viewConsignee";

  private amountUrl =
    "https://lightning-backend.herokuapp.com/transporter/indentConfirm";

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
}
