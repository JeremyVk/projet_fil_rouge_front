import { EventEmitter, Injectable, Output } from '@angular/core';
import { elementAt } from 'rxjs';
import { Article } from '../../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    this.cart = this.getCartIntoLocalStorage();
  }
  updateCartEmitter = new EventEmitter<Array<Article>>();
  cart: Array<Article> = [];

  addProductToCart(article: Article, quantityToIncrement: number): void {
    let index = this.getArticleIndexInCart(article);

    if (index !== -1) {
      let quantity = this.cart[index].quantity;

      this.cart[index].quantity = quantity ? quantity + quantityToIncrement
      : quantityToIncrement;
    } else {
      article.quantity = quantityToIncrement;
      this.cart.push(article);
    }
    this.pushCartToLocaleStorage(this.cart);
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

  deleteArticleFromLocalStorage(article: Article) {
    this.cart = this.cart.filter(elt => elt.id !== article.id);
    this.pushCartToLocaleStorage(this.cart);
  }

  getCart() {
    return this.cart;
  }

  getArticleIndexInCart(article: Article) {
    return this.cart.findIndex((elt) => elt.id === article.id);
  }

  isArticleInCart(article: Article) {
    return this.getArticleIndexInCart(article) !== -1;
  }

  checkIfArticleIsInStock(article: Article) {
    if (this.isArticleInCart(article)) {
      let articleInCart = this.cart[this.getArticleIndexInCart(article)];
      let quantity = articleInCart.quantity;
      let stock = articleInCart.stock;

      if (quantity && stock) {
        return stock - quantity > 0;
      }
      return false
    }

    article.quantity = 0;    
    if (article.quantity !== undefined && article.stock !== undefined) {
      return (article.stock - article.quantity) > 0;
    }    
    return false;
  }

  getMaxAvailable(article: Article): number {
    if (!this.isArticleInCart(article) && article.stock !== undefined) {
      return article.stock;
    }

    let articleInCart = this.cart[this.getArticleIndexInCart(article)];

    if (articleInCart.stock && articleInCart.quantity) {
      return articleInCart.stock - articleInCart.quantity;
    }
    return 0
  }
}
