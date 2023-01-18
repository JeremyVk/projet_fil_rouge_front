import { Component, OnInit } from '@angular/core';
import { BaseVariant } from '../../interfaces/baseVariant';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart: Array<BaseVariant> = [];
  variantQuantity: number = 0;
  cartTotalPrice: number = 0;
  shippingCost: number = 400;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.variantQuantity = this.cartService.getTotalVariantsQuantity();
    this.cartTotalPrice = this.cartService.getTotalCartPrice();
  }
}
