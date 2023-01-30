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
  loadingData: boolean = false;

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
    if (this.cart.length > 0) {
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
   
  }
}
