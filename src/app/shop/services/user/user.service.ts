import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, Observable, tap} from 'rxjs';
import { JsonWebTokenService } from 'src/app/services/json-web-token.service';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = `${environment.url}/api/users`;
  loginUrl: string = `${environment.url}/authentication_token`;

  user: User = {}

  constructor(private http: HttpClient, private jwtService: JsonWebTokenService, private router: Router ) { }

  findUserByEmail(email?: string) {
    return this.http.get<{'hydra:member': Array<User>}>(`${this.userUrl}/?email=${email}`).pipe(
      map((elt) => elt['hydra:member'])
    );
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

  setUserLogged(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserLogged(): User {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserAddressesCount(user: User): Observable<number> {
    return this.http.get<{'hydra:totalItems': number}>(`${this.userUrl}/${user.id}/addresses`).pipe(
      map((elt) => elt["hydra:totalItems"])
    );
  }
}
