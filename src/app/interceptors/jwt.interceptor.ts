import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, mergeMap, Observable } from 'rxjs';
import { JsonWebTokenService } from '../services/json-web-token.service';
import { UserService } from '../shop/services/user/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private jwtService: JsonWebTokenService,
    private userService: UserService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.jwtService.getJsonWebToken();
    let refreshToken = this.jwtService.getRefreshToken();

    if (!token) {
      return next.handle(request);
    }
    
    if(this.jwtService.isJsonWebTokenExpired(token) && refreshToken && request.url !== this.jwtService.refreshTokenUrl && request.url !== this.jwtService.loginUrl) {      
      return this.jwtService.refreshJwtToken(refreshToken).pipe(
        mergeMap(res => {
          this.jwtService.setJsonWebToken(res.token);
          this.jwtService.setRefreshWebToken(res.refresh_token);
           request = request.clone({
          setHeaders: {Authorization: `Bearer ${res.token}`}
        })
          return next.handle(request)
        }),
        catchError(err => {
          this.userService.logout();
          return next.handle(request)
        })
      )
    }

    request = request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    })

  return next.handle(request)
  }
}
