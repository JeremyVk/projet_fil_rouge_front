import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { flatMap, map, mergeMap, tap } from 'rxjs';
import { JsonWebTokenService } from 'src/app/services/json-web-token.service';
import { environment } from 'src/environments/environment';
import { User } from '../../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = `${environment.url}/api/users`;
  loginUrl: string = `${environment.url}/authentication_token`;

  constructor(private http: HttpClient, private jwtService: JsonWebTokenService, private router: Router ) { }

  findUserByEmail(email?: string) {
    return this.http.get<Array<User>>(`${this.userUrl}/?email=${email}`);
  }

  login(user: User) {
    return this.http.post<{token: string}>(`${this.loginUrl}`, user)
    .pipe(
      tap(elt => {
        this.jwtService.setJsonWebToken(elt.token);
      }),
      mergeMap(_ => {
        return this.findUserByEmail(user.email);
      }),
    )
  }

  registerUser(user: User) {
    return this.http.post<User>(`${this.userUrl}`, user)
    .pipe(
      mergeMap(_ => {
        return this.login(user)
      })
    );
  }
}
