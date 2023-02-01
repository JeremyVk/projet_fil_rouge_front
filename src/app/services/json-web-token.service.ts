import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonWebTokenService {

  constructor() { }

  getJsonWebToken(): string | null {
    return localStorage.getItem('JWT');
  }

  setJsonWebToken(jwt: string):void {
    localStorage.setItem('JWT', jwt);
  }

  deleteJsonWebToken():void {
    localStorage.removeItem('JWT');
    localStorage.removeItem('user');
  }

  hasJsonWebToken(): boolean {
    return localStorage.getItem('JWT') !== null;
  }
}
