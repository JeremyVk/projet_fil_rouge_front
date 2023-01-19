import { Component, Input, OnInit } from '@angular/core';
import { BaseVariant } from '../../interfaces/baseVariant';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() variant: BaseVariant = {};
  variantsPrice: number = 0;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.variantsPrice = this.productService.getVariantsPrice(this.variant)
  }

  ngOnChanges() {
    this.variantsPrice = this.productService.getVariantsPrice(this.variant)
  }
}
