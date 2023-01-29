import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, elementAt } from 'rxjs';
import { Article } from '../../interfaces/article';
import { BaseVariant } from '../../interfaces/baseVariant';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {    
    this.cartSubject.next(this.getCartIntoLocalStorage())
  }
  updateCartEmitter = new EventEmitter<Array<BaseVariant>>();

  cartSubject = new BehaviorSubject<Array<BaseVariant>>([]);
  cart$ = this.cartSubject.asObservable();

  addProductToCart(article: BaseVariant, quantityToIncrement: number = 1): void|string {

    if(!this.isArticleInStock(article)) {
      return "L'article n'est plus en stock";
    }

    let variantInCart = this.getArticleInCart(article)

    if( !variantInCart) {
      article.quantity = 1;
      let newCart = [...this.cartSubject.value, article];
      this.cartSubject.next(newCart);
    } else {      
      this.incrementVariantQuantity(variantInCart);
    }
    this.pushCartToLocaleStorage(this.cartSubject.value);
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
    let newCart = this.cartSubject.value.filter(elt => elt.id !== article.id);
    this.pushCartToLocaleStorage(newCart);
    this.cartSubject.next(newCart);
  }

  getArticleQuantity(cart: Array<BaseVariant>) {
    let quantity = 0;

    cart.forEach(article => {
      quantity += article.quantity ? article.quantity : 0
    })

    return quantity;
  }


  getArticleIndexInCart(article: BaseVariant) {
    return this.cartSubject.value.findIndex((elt) => elt.id === article.id);
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
    return this.cartSubject.value.find(elt => elt.id === baseVariant.id && elt.type === baseVariant.type);
  }

  getTotalVariantsQuantity(): number {
    let quantity = 0;

    this.cartSubject.value.forEach(variant => {
      if (variant.quantity) {
        quantity += variant.quantity
      }
    })
    return quantity;
  }

  getTotalCartPrice(): number {
    let total = 0;
    this.cartSubject.value.forEach(variant => {
      if (variant.unitPrice && variant.quantity) {
        total +=  variant.unitPrice * variant.quantity;
      }
      
    })
    return total;
  }

  decrementVariantQuantity(variant: BaseVariant) {
    this.cartSubject.value.map(cartItem => {
      if (variant.id === cartItem?.id && variant.type === cartItem?.type) {          
        cartItem.quantity && cartItem.quantity --
      }
    });
    this.pushCartToLocaleStorage(this.cartSubject.value);
  }

  incrementVariantQuantity(variant: BaseVariant) {
    this.cartSubject.value.map(cartItem => {
      if (variant.id === cartItem?.id && variant.type === cartItem?.type) {          
        cartItem.quantity && cartItem.quantity ++
      }
    });
    this.pushCartToLocaleStorage(this.cartSubject.value);
  }

  deleteCart() {
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }
}


