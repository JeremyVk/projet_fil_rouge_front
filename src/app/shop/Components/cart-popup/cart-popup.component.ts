import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.css']
})
export class CartPopupComponent implements OnInit {
  @Input() cart: Array<Article> = [];
  @Output() closePopupEmitter = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
  }

  closePopup() {
    this.closePopupEmitter.emit(false);
  }
}
