import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../../interfaces/article';
import { BaseVariant } from '../../interfaces/baseVariant';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-cart-popup-article',
  templateUrl: './cart-popup-article.component.html',
  styleUrls: ['./cart-popup-article.component.css']
})
export class CartPopupArticleComponent implements OnInit {
  @Input() variant: BaseVariant = {};
  imgUrl: string = environment.productImagesUrl

  constructor(
    private cartService: CartService,
    private productService: ProductService
    ) { }

  ngOnInit(): void {
    if (typeof this.variant.parent === "string") {
      this.productService.getParent(this.variant).subscribe(res => {
        this.variant.parent = res;
     });
    }
  }

  deleteArticle() {
    this.cartService.deleteArticleFromLocalStorage(this.variant);
  }
}
