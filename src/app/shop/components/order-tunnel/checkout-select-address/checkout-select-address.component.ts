import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/shop/interfaces/address';
import { Order } from 'src/app/shop/interfaces/order';
import { User } from 'src/app/shop/interfaces/user';
import { CartService } from 'src/app/shop/services/cart/cart.service';
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
  loadingData: boolean = true;
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUserLogged();
    this.userService.getUserAddresses(this.user).subscribe({
      next: (userAddresses) => {
        this.userAddresses = userAddresses;
        this.loadingData =  false;
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  async checkoutOrder() {
    if (this.selectedAddress.id === undefined) {
      return;
    }
    let variantsRemoveds = await this.cartService.productStockCheckout();

    if (variantsRemoveds.length > 0) {
      return this.router.navigate(['/cart', {'variantsRemoveds': JSON.stringify(variantsRemoveds)}] );
  }

    this.orderService.postOrder(this.selectedAddress).subscribe({
      next: (order: Order) => {
        this.cartService.deleteCart();
        return this.router.navigate(["/checkout/order-success", {'order': JSON.stringify(order)}])
      },
      error: (e) => {
        console.error(e);
        if (e.error === 'product.stock.empty') {
          return;
        }
      }
    })

    return null;
  }

  addAddress() {
    return this.router.navigateByUrl('/checkout/create-address')
  }
}
