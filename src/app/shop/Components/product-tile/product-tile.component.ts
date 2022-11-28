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
  maxAvailable: number = 0;
  inputQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateIsArticleIsInStock()
    this.updateMaxAvailable();
    this.updateInputQuantityAfterSubmitting();
  }

  ngDoCheck(): void {
    this.updateIsArticleIsInStock()
    this.updateMaxAvailable();
  }

  addToCart() {
    if (this.isArticleInStock) {
      this.cartService.addProductToCart(this.article, this.inputQuantity);
      this.updateMaxAvailable();
      this.updateIsArticleIsInStock()
      this.updateInputQuantityAfterSubmitting();
    }
  }

  updateInputQuantityAfterSubmitting() {
    this.inputQuantity = 1;
  }

  updateMaxAvailable() {
    this.maxAvailable = this.cartService.getMaxAvailable(this.article);
  }

  updateIsArticleIsInStock() {
    this.isArticleInStock = this.cartService.checkIfArticleIsInStock(this.article);
  }
}
