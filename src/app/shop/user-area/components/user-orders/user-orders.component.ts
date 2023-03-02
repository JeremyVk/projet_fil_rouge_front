import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shop/interfaces/order';
import { User } from 'src/app/shop/interfaces/user';
import { UserService } from 'src/app/shop/services/user/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  user: User = {};
  orders: Order[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.userSubject$.subscribe(res => {
      if (res.id !== undefined) {
        this.userService.findUserOrders(res).subscribe({
          next: orders => {
            this.orders = orders['hydra:member'];
          },
          error: e => {

          }
        })
      }
    })
  }

}
