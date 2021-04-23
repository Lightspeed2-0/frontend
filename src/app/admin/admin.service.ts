import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  trasnporterUrL =
    "https://lightning-backend.herokuapp.com/admin/transporter/verify";
  constructor(private http: HttpClient) {}

  transporterGet() {
    return this.http.get<any>(this.trasnporterUrL);
  }
}
