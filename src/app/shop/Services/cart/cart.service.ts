import { EventEmitter, Injectable, Output } from '@angular/core';
import { elementAt } from 'rxjs';
import { Article } from '../../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  updateCartEmitter = new EventEmitter<Array<Article>>()

  addProductToCart(article: Article): void {
    let cart: Array<Article> = this.getCartIntoLocalStorage();
    let index = cart.findIndex((elt) => elt.id === article.id);

    if (index !== -1) {
      let quantity = cart[index].quantity;

      cart[index].quantity = quantity ? quantity + 1
      : 1;
    } else {
      article.quantity = 1;
      cart.push(article);
    }
    this.pushCartToLocaleStorage(cart);
  }

  getCartIntoLocalStorage() {
     let stringCart = localStorage.getItem("cart");
     return stringCart ? JSON.parse(stringCart) : [];
  }

  pushCartToLocaleStorage(cart: Array<any>) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCartEmitter.emit(cart);
  }

  getArticleQuantity(cart: Array<Article>) {
    let quantity = 0;

    cart.forEach(article => {
      quantity += article.quantity ? article.quantity : 0
    })

    return quantity;
  }

  deleteArticle(article: Article) {
    let cart: Array<Article> = this.getCartIntoLocalStorage();
    cart = cart.filter(elt => elt.id !== article.id);

    this.pushCartToLocaleStorage(cart);
  }
}
