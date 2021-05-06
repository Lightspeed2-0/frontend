import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private trasnporterUrL =
    "https://lightning-backend.herokuapp.com/admin/transporter/verify";

  private consigneeURL =
    "https://lightning-backend.herokuapp.com/admin/consignee/verify";

  private getQueriesUrl = "https://lightning-backend.herokuapp.com/contactForm";

  private deleteQueriesUrl =
    "https://lightning-backend.herokuapp.com/deleteContactForm";

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

  getQuery() {
    return this.http.get<any>(this.getQueriesUrl);
  }

  sendReply(data: any) {
    return this.http.put<any>(this.getQueriesUrl, data);
  }

  delteQuery(data: any) {
    return this.http.post<any>(this.deleteQueriesUrl, data);
  }
}
