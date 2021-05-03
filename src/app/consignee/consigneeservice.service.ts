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
  getTransporterUrl =
    "https://lightning-backend.herokuapp.com/consignee/getTransporter";
  indentUrl = "https://lightning-backend.herokuapp.com/consignee/createIndent";
  getOrderUrl = "https://lightning-backend.herokuapp.com/consignee/yourOrders";
  getConsigneeUrl =
    "https://lightning-backend.herokuapp.com/transporter/getConsignee";

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
    return this.http.post<any>(data, this.getConsigneeUrl);
  }
}
