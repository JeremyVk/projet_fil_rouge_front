import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonWebTokenService } from '../services/json-web-token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private jwtService: JsonWebTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.jwtService.getJsonWebToken();
    if(token) {
      const clone = request.clone({
        setHeaders: {Authorization: `Authorization token ${token}`}
      })

      return next.handle(clone)
    }

    return next.handle(request);
  }
}
