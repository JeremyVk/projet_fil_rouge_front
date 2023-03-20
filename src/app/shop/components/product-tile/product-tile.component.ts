import { Component, Input, OnInit} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../../interfaces/article';
import { BaseVariant } from '../../interfaces/baseVariant';
import { Book } from '../../interfaces/book';
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
  hasManyVariants: boolean = false;
  url:string =  environment.productImagesUrl;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateMaxAvailable();
    this.updateInputQuantityAfterSubmitting();
    this.hasManyVariants = this.hasArticleManyVariants();
  }

  ngDoCheck(): void {
    this.updateMaxAvailable();
  }
 
  updateInputQuantityAfterSubmitting() {
    this.inputQuantity = 1;
  }

  updateMaxAvailable() {
    // this.maxAvailable = this.cartService.getMaxAvailable(this.article);
  }

  

  hasArticleManyVariants() {
    if(this.article.variants !== undefined) {
      return this.article.variants.length > 1
    }
    return false
  }
}
