import { Component, Input, OnInit} from '@angular/core';
import { Article } from '../../interfaces/article';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css']
})
export class ProductTileComponent implements OnInit {
  @Input() article: Article = {};
  isArticleInStock: boolean = true;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.isArticleInStock = this.cartService.checkIfArticleIsInStock(this.article);
  }

  ngDoCheck(): void {
    this.isArticleInStock = this.cartService.checkIfArticleIsInStock(this.article);
  }

  addToCart() {
    this.cartService.addProductToCart(this.article);
  }
}
