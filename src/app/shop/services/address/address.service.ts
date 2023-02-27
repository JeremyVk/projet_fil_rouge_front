import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../../interfaces/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
addressUrl: string = `${environment.url}/api/addresses`
  constructor(
    private http: HttpClient
  ) { }


  public postAddress(address: Address) {
    return this.http.post<Address>(this.addressUrl, address);
  }

  public editAddress(address: Address) {
    return this.http.put<Address>(`${this.addressUrl}/${address.id}`, address);
  }
}
