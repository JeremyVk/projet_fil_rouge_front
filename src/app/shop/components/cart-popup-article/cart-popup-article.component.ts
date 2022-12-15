import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart-popup-article',
  templateUrl: './cart-popup-article.component.html',
  styleUrls: ['./cart-popup-article.component.css']
})
export class CartPopupArticleComponent implements OnInit {
@Input() article: Article = {};
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  deleteArticle() {
    this.cartService.deleteArticleFromLocalStorage(this.article);
  }
}
