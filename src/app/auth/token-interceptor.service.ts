import { AuthserviceService } from './authservice.service';
import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authservice = this.injector.get(AuthserviceService);
    const token = authservice.getToken();
    let tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(tokenReq);
  }
}
