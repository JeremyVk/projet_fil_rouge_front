import { Component, OnInit } from '@angular/core';
import { BaseVariant } from '../../interfaces/baseVariant';
import { Order } from '../../interfaces/order';
import { CartService } from '../../services/cart/cart.service';
import { OrderService } from '../../services/order/order.service';
import {UserService} from "../../services/user/user.service";
import {JsonWebTokenService} from "../../../services/json-web-token.service";
import {Router} from "@angular/router";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart: Array<BaseVariant> = [];
  order: Order = {};
  userHasAddresses = false;
  variantQuantity: number = 0;
  cartTotalPrice: number = 0;
  shippingCost: number = 400;
  loadingData: boolean = true;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService,
    private jwtService: JsonWebTokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.orderService.addCartToOrder(this.cart);
    });

    this.variantQuantity = this.cartService.getTotalVariantsQuantity();
    this.cartTotalPrice = this.cartService.getTotalCartPrice();

    this.orderService.order$.subscribe(order => {
      this.order = order;
    })

   this.checkIfUserHaveAddresses(this.userService.getUserLogged())
  }

  ngDoCheck() {
    this.variantQuantity = this.cartService.getTotalVariantsQuantity();
    this.cartTotalPrice = this.cartService.getTotalCartPrice();
  }

  async checkoutOrder() {
    if (this.cart.length <= 0) {
      return;
    }
    let user = this.userService.getUserLogged();
    if (!user || !this.jwtService.hasJsonWebToken()) {
      this.router.navigateByUrl('/login');
    }
    
    if (!this.userHasAddresses) {
      this.router.navigateByUrl('/checkout/create-address');
    }

    this.loadingData = true;
    this.orderService.postOrder().subscribe({
      next: (res) => {
        this.loadingData = false;
        this.cartService.deleteCart();
      },
      error: (e) => {
        this.loadingData = false;
        console.error(e)
      }
    })
  }

   public checkIfUserHaveAddresses(user: User)
  {
    let result:boolean = false;
    this.userService.getUserAddressesCount(user).subscribe({
      next: (res) => {
        this.userHasAddresses = res > 0
        this.loadingData = false
  }
    })
  }
}
