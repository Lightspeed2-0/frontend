import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  constructor(private http: HttpClient) {}
  consigneeLoginUrl = 'https://lightning-backend.herokuapp.com/consignee/login';
  transporterLoginUrl =
    'https://lightning-backend.herokuapp.com/transporter/login';
  consigneeLogin(data: { Email: string; Password: string }) {
    return this.http.post(this.consigneeLoginUrl, data);
  }
  transporterLogin(data: { Email: string; Password: string }) {
    return this.http.post(this.transporterLoginUrl, data);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
