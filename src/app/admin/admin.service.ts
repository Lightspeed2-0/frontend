import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  trasnporterUrL =
    "https://lightning-backend.herokuapp.com/admin/transporter/verify";
  consigneeURL =
    "https://lightning-backend.herokuapp.com/admin/consignee/verify";

  constructor(private http: HttpClient) {}

  transporterGet() {
    return this.http.get<any>(this.trasnporterUrL);
  }

  transporterVerify(data: any) {
    return this.http.post<any>(this.trasnporterUrL, data);
  }

  transporterDecline(data: any) {
    return this.http.post<any>(this.trasnporterUrL, data);
  }

  consigneeGet() {
    return this.http.get<any>(this.consigneeURL);
  }

  consigneeVerify(data: any) {
    return this.http.post<any>(this.consigneeURL, data);
  }

  consigneeDecline(data: any) {
    return this.http.post<any>(this.consigneeURL, data);
  }
}
