import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/shop/interfaces/article';

@Component({
  selector: 'app-many-add-to-cart-button',
  templateUrl: './many-add-to-cart-button.component.html',
  styleUrls: ['./many-add-to-cart-button.component.css']
})
export class ManyAddToCartButtonComponent implements OnInit {

  @Input()article: Article = {}
  openLayer: boolean = false;
  constructor() { }

  ngOnInit(): void {
  this.article.variants?.forEach(elt => console.log(elt.format))    
  }

  toggleOpenLayer() {
    this.openLayer = !this.openLayer;
  }

}
