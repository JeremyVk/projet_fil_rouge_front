import { Component, Input, OnInit } from '@angular/core';
import { BaseVariant } from 'src/app/shop/interfaces/baseVariant';
import { CartService } from 'src/app/shop/services/cart/cart.service';

@Component({
  selector: 'app-product-quantity-increment',
  templateUrl: './product-quantity-increment.component.html',
  styleUrls: ['./product-quantity-increment.component.css']
})
export class ProductQuantityIncrementComponent implements OnInit {
  @Input() variant: BaseVariant = {};

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  decrementVariantQuantity(): void {
    if(this.variant.quantity && this.variant.quantity > 1) {      
      this.cartService.decrementVariantQuantity(this.variant)
    }
  }

  incrementVariantQuantity(): void {
    if (this.variant?.quantity && this.variant?.stock) {
      this.cartService.incrementVariantQuantity(this.variant)
    }
  }
}
