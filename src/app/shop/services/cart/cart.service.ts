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

    let variantInCart = this.getArticleInCart(article)

    if( !variantInCart) {
      article.quantity = 1;
      this.cart.push(article);
    } else {      
      this.cart.map(variant => {
        if (variant.id === variantInCart?.id && variant.type === variantInCart?.type) {          
          variant.quantity && variant.quantity ++
        }
      });
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

  isArticleInStock(article: BaseVariant): boolean {
   
    if(!article.stock) {
      return false;
    }

    if(!this.isArticleInCart(article)) {
      return article?.stock > 0;
    }

    let quantity = this.getArticleInCart(article)?.quantity;
    return quantity ? article.stock - quantity > 0 : false;
  }

  getArticleInCart(baseVariant: BaseVariant) {
    return this.cart.find(elt => elt.id === baseVariant.id && elt.type === baseVariant.type);
  }

  getTotalVariantsQuantity(): number {
    let quantity = 0;

    this.cart.forEach(variant => {
      if (variant.quantity) {
        quantity += variant.quantity
      }
    })
    return quantity;
  }
}


