import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../../interfaces/order';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderUrl: string = `${environment.url}/api/orders`
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private userService: UserService
  ) { }

  public postOrder()
  {
    let order: Order = this.createOrder();
    return this.http.post<Order>(`${this.orderUrl}`, order)
  }

  public createOrder() {
    let order: Order = {};
    order.user = this.userService.getUserLogged();
    order.orderItems = this.cartService.getCartIntoLocalStorage();
    order.shippingAmount = environment.baseShippingAmount,
    console.log(order);
    return order
  }
}
