import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = `${environment.url}/api/users`;
  loginUrl: string = `${environment.url}/authentication_token`;

  constructor(private http: HttpClient ) { }

  findUserByEmail(email?: string) {
    return this.http.get<Array<User>>(`${this.userUrl}/?email=${email}`);
  }

  login(user: User) {
    return this.http.post<{token: string}>(`${this.loginUrl}`, user);
  }

  registerUser(user: User) {
    return this.http.post<User>(`${this.userUrl}`, user);
  }
}
