import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../../interfaces/address';
import { BaseVariant } from '../../interfaces/baseVariant';
import { Order } from '../../interfaces/order';
import { User } from '../../interfaces/user';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl: string = `${environment.url}/api/orders`
  user: User = {}
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private userService: UserService
  ) { 
    this.userService.userSubject$.subscribe(res => {
      this.user = res
    })
  }


  public postOrder(address: Address): Observable<Order>
  {
    let order: Order = this.createOrder(address);    
    return this.http.post<Order>(`${this.orderUrl}`, order)
  }

  public createOrder(address: Address): Order {
    let order: Order = {};
    order.user = this.user;
    order.orderItems = this.cartService.getCartIntoLocalStorage();
    order.shippingAmount = environment.baseShippingAmount;
    order.shippingAddress = address.id;
    return order
  }
}
