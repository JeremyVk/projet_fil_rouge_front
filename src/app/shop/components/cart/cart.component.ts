import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article';
import { BaseVariant } from '../../interfaces/baseVariant';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Array<BaseVariant> = [];
  articleQuantity: number = 0;

  showPopup: boolean = false;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(data => {
    this.cart = data;
    })
    this.updateArticleQuantity()
  }

  ngDoCheck() {
    this.updateArticleQuantity()
  }

  updateArticleQuantity() {
    this.articleQuantity = this.cartService.getTotalVariantsQuantity();
  }

  toggleShowPopup(state: string) {
    if (window.innerWidth < 1024) {
      this.showPopup = false
      return
    }

    if (state === 'mouseover') {
      this.showPopup = true
    }

    if (state === 'mouseleave') {
      this.showPopup = false
    }
  }
}
