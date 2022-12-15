import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/shop/interfaces/article';
import { BaseVariant } from 'src/app/shop/interfaces/baseVariant';
import { CartService } from 'src/app/shop/services/cart/cart.service';

@Component({
  selector: 'app-simple-add-to-cart-button',
  templateUrl: './simple-add-to-cart-button.component.html',
  styleUrls: ['./simple-add-to-cart-button.component.css']
})
export class SimpleAddToCartButtonComponent implements OnInit {

  @Input() variant: BaseVariant = {

  };
  isArticleInStock: boolean = true;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateIsArticleIsInStock()
  }

  ngDoCheck(): void {
    this.updateIsArticleIsInStock();
  }

  addToCart(variant: BaseVariant) {    
    if (this.isArticleInStock) {      
      this.cartService.addProductToCart(variant);
      this.updateIsArticleIsInStock()
    }
  }

  updateIsArticleIsInStock() {
    this.isArticleInStock = this.cartService.isArticleInStock(this.variant);
  }
}
