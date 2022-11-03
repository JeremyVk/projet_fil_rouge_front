import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Array<Article> = [];
  articleQuantity: number = 0;

  showPopup: boolean = false;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCartIntoLocalStorage();
    this.cartService.updateCartEmitter.subscribe(data => {
      this.cart = data;
    })
    this.updateArticleQuantity()
  }

  ngDoCheck() {
    this.updateArticleQuantity()
  }

  updateArticleQuantity() {
    this.articleQuantity = this.cartService.getArticleQuantity(this.cart);
  }
}
