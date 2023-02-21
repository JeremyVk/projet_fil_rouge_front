import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { Jwt } from '../shop/interfaces/jwt';

@Injectable({
  providedIn: 'root'
})
export class JsonWebTokenService {
  refreshTokenUrl: string = `${environment.url}/api/token/refresh`
  loginUrl: string = `${environment.url}/api/login_check`
  constructor(
    private http: HttpClient,
  ) { }

  getJsonWebToken(): string | null {
    return localStorage.getItem('JWT');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  setJsonWebToken(jwt: string):void {
    localStorage.setItem('JWT', jwt);
  }

  setRefreshWebToken(refreshToken: string):void {    
    localStorage.setItem('refresh_token', refreshToken);
}

  deleteJsonWebToken():void {
    localStorage.removeItem('JWT');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh_token');
  }

  hasJsonWebToken(): boolean {
    return localStorage.getItem('JWT') !== null;
  }

  isJsonWebTokenExpired(token: string): boolean {
      let decryptedToken: Jwt = jwt_decode(token);
      const now = new Date().getTime() / 1000;

      return now > decryptedToken.exp;
  }

  refreshJwtToken(refresh_token: string) {
    return this.http.post<{token: string, refresh_token: string}>(`${environment.url}/api/token/refresh`, {"refresh_token": refresh_token})
  }
}
