import { Component, OnInit } from '@angular/core';
import { BaseVariant } from '../../interfaces/baseVariant';
import { CartService } from '../../services/cart/cart.service';
import { OrderService } from '../../services/order/order.service';

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
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
    
    this.variantQuantity = this.cartService.getTotalVariantsQuantity();
    this.cartTotalPrice = this.cartService.getTotalCartPrice();
  }

  ngDoCheck() {
    this.variantQuantity = this.cartService.getTotalVariantsQuantity();
    this.cartTotalPrice = this.cartService.getTotalCartPrice();
  }

  checkoutOrder() {
    this.orderService.postOrder().subscribe({
      next: (res) => {
        this.cartService.deleteCart();
      },
      error: (e) => {
        console.error(e)
      }
    }

    )
  }
}
