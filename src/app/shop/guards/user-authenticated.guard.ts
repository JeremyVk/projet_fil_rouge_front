import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JsonWebTokenService } from 'src/app/services/json-web-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticatedGuard implements CanActivate {
  constructor(
    private jwtService: JsonWebTokenService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.jwtService.hasJsonWebToken() || this.router.parseUrl('/login');
    }
  
}
