import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseVariant } from '../../interfaces/baseVariant';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() variant: BaseVariant = {};
  variantsPrice: number = 0;
  imageUrl: string = environment.productImagesUrl

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.variantsPrice = this.productService.getVariantsPrice(this.variant)
  }

  ngDoCheck() {
    this.variantsPrice = this.productService.getVariantsPrice(this.variant)
  }

  deleteVariant(variant: BaseVariant) {
    this.cartService.deleteArticleFromLocalStorage(variant);
  }
}
