import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DriverService {
  Username = "";

  private getOrderUrl =
    "https://lightning-backend.herokuapp.com/driver/getOrders";

  private updateStatusUrl =
    "https://lightning-backend.herokuapp.com/driver/updateStatus";

  constructor(private http: HttpClient) {}

  getOrder() {
    return this.http.get<any>(this.getOrderUrl);
  }

  updateStatus(data: any) {
    return this.http.post<any>(this.updateStatusUrl, data);
  }
}
