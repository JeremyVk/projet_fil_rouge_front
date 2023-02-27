import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, mergeMap, Observable, Subject, tap} from 'rxjs';
import { JsonWebTokenService } from 'src/app/services/json-web-token.service';
import { environment } from 'src/environments/environment';
import { Address } from '../../interfaces/address';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = `${environment.url}/api/users`;
  loginUrl: string = `${environment.url}/api/login_check`;

  user: User = {}

  userSubject$: BehaviorSubject<User> = new BehaviorSubject<User>({})
  userAddresses$: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([])

  constructor(
    private http: HttpClient,
    private jwtService: JsonWebTokenService,
    private router: Router ) {
   }

  findUserByEmail(email?: string) {
    return this.http.get<{'hydra:member': Array<User>}>(`${this.userUrl}/?email=${email}`).pipe(
      map((elt) => elt['hydra:member'])
    );
  }

  login(user: User) {
    return this.http.post<{token: string, refresh_token: string}>(`${this.loginUrl}`, user)
    .pipe(
      tap(elt => {
        this.jwtService.setJsonWebToken(elt.token);
        this.jwtService.setRefreshWebToken(elt['refresh_token']);
        this.getUser();
      }),
    )
  }

  logout() {
    this.jwtService.deleteJsonWebToken();
    this.router.navigateByUrl('/login');
    this.userSubject$.next({});
  }

  registerUser(user: User) {
    return this.http.post<User>(`${this.userUrl}`, user)
    .pipe(
      mergeMap(_ => {
        user.password = user.plainPassword
        return this.login(user)
      })
    );
  }

  getUserAddressesCount(user: User): Observable<number> {
    return this.http.get<{'hydra:totalItems': number}>(`${this.userUrl}/${user.id}/addresses`).pipe(
      map((elt) => elt["hydra:totalItems"])
    );
  }

  getUserAddresses(): Observable<Array<Address>> {
    return this.http.get<{'hydra:member': Array<Address>}>(`${this.userUrl}/${this.userSubject$.getValue().id}/addresses`).pipe(
      map((elt) => elt['hydra:member'])
    );
  }

  editUser(user: User) {    
    return this.http.put<User>(`${this.userUrl}/${user.id}`, user)
  }

  editUserSubject(user: User) {
    this.userSubject$.next(user);
  }

  getUser() {
    this.http.get<User>(`${environment.url}/api/getMe`).subscribe({
      next: res => {
        if (res) {
          this.userSubject$.next(res)
        }
      },
      error: e => {
        this.jwtService.deleteJsonWebToken();
      }
    })
  }

  editUserAddressesSubject(addresses: Address[])
  {
    this.userAddresses$.next(addresses)
  }

  editUserPassword(user: User) {    
    return this.http.put<User>(`${this.userUrl}/reset_password`, {password: user.currentPassword, plainPassword: user.plainPassword})
  }
}
