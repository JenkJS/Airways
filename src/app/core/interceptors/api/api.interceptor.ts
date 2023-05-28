import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { TokenService, LocalStorageService } from '../../services/index';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  BASE_URL = 'https://api2.air-ways.online/';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${this.BASE_URL}${req.url}` });
    return next.handle(apiReq);
  }

}
