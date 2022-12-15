import { EventEmitter, Injectable, Output } from '@angular/core';
import { elementAt } from 'rxjs';
import { Article } from '../../interfaces/article';
import { BaseVariant } from '../../interfaces/baseVariant';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {
    this.cart = this.getCartIntoLocalStorage();
  }
  updateCartEmitter = new EventEmitter<Array<BaseVariant>>();
  cart: Array<BaseVariant> = [];

  addProductToCart(article: BaseVariant, quantityToIncrement: number = 1): void|string {

    if(!this.isArticleInStock(article)) {
      return "L'article n'est plus en stock";
    }
      this.cart.push(article);
      console.log(this.cart);

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

  deleteArticleFromLocalStorage(article: Article) {
    this.cart = this.cart.filter(elt => elt.id !== article.id);
    this.pushCartToLocaleStorage(this.cart);
  }

  getArticleQuantity(cart: Array<BaseVariant>) {
    let quantity = 0;

    cart.forEach(article => {
      quantity += article.quantity ? article.quantity : 0
    })

    return quantity;
  }



  getCart() {
    return this.cart;
  }

  getArticleIndexInCart(article: BaseVariant) {
    return this.cart.findIndex((elt) => elt.id === article.id);
  }

  //LES FONCTIONS QUE JE GARDE

  isArticleInCart(article: BaseVariant) {
    return this.getArticleIndexInCart(article) !== -1;
  }

  getArticleQuantityInCart(article: BaseVariant) {   
    return this.cart.filter(elt => elt.id == article.id && elt.parent === article.parent).length;
  }

  isArticleInStock(article: BaseVariant): boolean {
   
    if(!article.stock) {
      return false;
    }

    if(!this.isArticleInCart(article)) {
      return article?.stock > 0;
    }

    let quantity = this.getArticleQuantityInCart(article);
    return article.stock - quantity > 0;
  }

  getMaxAvailable(article: BaseVariant): number {
    // if (!this.isArticleInCart(article) && article.stock !== undefined) {
    //   return article.stock;
    // }

    // let articleInCart = this.cart[this.getArticleIndexInCart(article)];

    // if (articleInCart.stock && articleInCart.quantity) {
    //   return articleInCart.stock - articleInCart.quantity;
    // }
    return 0
  }

  // hasManyVariants(article: Article) {
  //   return article.variants !== undefined && article.variants.length > 1;
  // }

  // hasVariant(article: Article) {
  //   return article.variants !== undefined && article.variants.length > 0;
  // }
}
