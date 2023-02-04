import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/shop/interfaces/address';
import { Order } from 'src/app/shop/interfaces/order';
import { User } from 'src/app/shop/interfaces/user';
import { OrderService } from 'src/app/shop/services/order/order.service';
import { UserService } from 'src/app/shop/services/user/user.service';

@Component({
  selector: 'app-checkout-select-address',
  templateUrl: './checkout-select-address.component.html',
  styleUrls: ['./checkout-select-address.component.css']
})
export class CheckoutSelectAddressComponent implements OnInit {
  userAddresses: Array<Address> = [];
  user: User = {}
  selectedAddress: Address = {};
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUserLogged();
    this.userService.getUserAddresses(this.user).subscribe({
      next: (userAddresses) => {
        this.userAddresses = userAddresses;        
      },
    })
  }

  checkoutOrder() {
    if (this.selectedAddress.id === undefined) {
      return;
    }

    this.orderService.postOrder(this.selectedAddress).subscribe({
      next: (order: Order) => {
        console.log(order);
        this.router.navigateByUrl("/")
      },
      error: (e) => {
        console.error(e);
      }
    })    
  }
}
