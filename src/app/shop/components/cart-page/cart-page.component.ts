import { Component, OnInit } from '@angular/core';
import { BaseVariant } from '../../interfaces/baseVariant';
import { CartService } from '../../services/cart/cart.service';
import {UserService} from "../../services/user/user.service";
import {JsonWebTokenService} from "../../../services/json-web-token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart: Array<BaseVariant> = [];
  userHasAddresses = false;
  variantQuantity: number = 0;
  cartTotalPrice: number = 0;
  shippingCost: number = 400;
  loadingData: boolean = true;

  user: User = {};
  errorMessages: Array<string> = [];

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private jwtService: JsonWebTokenService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let errors = null;
    let variantRemoveds = this.route.snapshot.paramMap.get('variantsRemoveds');

    if (variantRemoveds) {
      errors = JSON.parse(variantRemoveds);
    }

    if (errors) {
      this.errorMessages = this.cartService.generateCartErrorMessages(errors);
    }

    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });

    this.userService.userSubject$.subscribe(res => {
      this.user = res;
      this.loadingData = false
    })

    if (this.cart.length > 0) {
      this.variantQuantity = this.cartService.getTotalVariantsQuantity();
      this.cartTotalPrice = this.cartService.getTotalCartPrice();
    }

  }

  ngDoCheck() {
    this.variantQuantity = this.cartService.getTotalVariantsQuantity();
    this.cartTotalPrice = this.cartService.getTotalCartPrice();
  }

  checkoutOrder() {
    if (this.cart.length <= 0) {
      return;
    }

    if (!this.user.id || !this.jwtService.hasJsonWebToken()) {
       return this.router.navigateByUrl('/login');
    }
    
    if (!this.user?.addresses?.length) {
      return this.router.navigateByUrl('/checkout/create-address');
    }

    return this.router.navigateByUrl('/checkout/select-address');
  }
}
