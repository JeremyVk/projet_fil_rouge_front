import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseVariant } from '../../interfaces/baseVariant';
import { Order } from '../../interfaces/order';
import { CartService } from '../cart/cart.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderSubject = new BehaviorSubject<Order>({});
  order$= this.orderSubject.asObservable();

  orderUrl: string = `${environment.url}/api/orders`
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private userService: UserService
  ) { 
    this.orderSubject.next(this.createOrder());
  }


  public postOrder(): Observable<Order>
  {
    let order: Order = this.createOrder();
    return this.http.post<Order>(`${this.orderUrl}`, order)
  }

  public createOrder(): Order {
    let order = this.orderSubject.getValue();
    order.user = this.userService.getUserLogged();
    order.orderItems = this.cartService.getCartIntoLocalStorage();
    order.shippingAmount = environment.baseShippingAmount;
    
    return order
  }

  public checkoutOrder() {

  }

  public addCartToOrder(cart: Array<BaseVariant>): void
  {
    let order = this.orderSubject.getValue()
    order.orderItems = cart;

    this.orderSubject.next(order);
  }

}
