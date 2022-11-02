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

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addProductToCart(this.article);
  }
}
