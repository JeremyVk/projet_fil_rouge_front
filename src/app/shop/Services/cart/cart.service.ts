import { Injectable } from '@angular/core';
import { Article } from '../../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addProductToCart(article: Article, quantity: number):void {
  }
}
