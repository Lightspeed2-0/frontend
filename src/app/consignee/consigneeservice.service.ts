import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ConsigneeserviceService {
  constructor(private http: HttpClient) {}
  getTransporterUrl =
    "https://lightning-backend.herokuapp.com/consignee/getTransporter";
  indentUrl = "https://lightning-backend.herokuapp.com/consignee/createIndent";

  getTransporter() {
    return this.http.get<any>(this.getTransporterUrl);
  }

  indentCreate(data: any) {
    return this.http.post<any>(this.indentUrl, data);
  }
}
