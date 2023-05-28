import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAuthResponse, LocalStorageService } from '../../../core/index';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiKey = 'W0gFMcHXo1Q23VG6rxyAnALXvf08MdaQ';
  private apiSecret = 'pKhARZWFMd6iy823';
  private apiTokenEndpoint = 'v1/security/oauth2/token';

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  getToken(): Observable<string> {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new HttpParams()
    .set('grant_type', 'client_credentials')
    .set('client_id', this.apiKey)
    .set('client_secret', this.apiSecret);

    return this.http.post<IAuthResponse>(this.apiTokenEndpoint, body.toString(), {headers})
      .pipe(
        map((response: IAuthResponse): string => {
          const token = response.access_token;
          const expiresIn = response.expires_in;
          const expirationTime = new Date().getTime() + expiresIn * 1000;
          
          this.localStorage.setItem('apiToken', token);
          this.localStorage.setItem('apiTokenExpirationTime', expirationTime.toString())
          

          return token;
        })
      );
  }
}
