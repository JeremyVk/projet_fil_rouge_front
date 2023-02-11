import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../interfaces/article';
import { BaseVariant } from '../../interfaces/baseVariant';
import { Book } from '../../interfaces/book';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  article: Article = {};
  variants: Array<BaseVariant> = [];
  selectedVariant: BaseVariant = {};
  loadingData: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('productId'))!;
    this.getBook(id);
  }

  getBook(id:number) {
    this.productService.findBookById(id).subscribe(res => {
      this.article = res;
      this.variants = this.article.variants ? this.article.variants : []
      this.selectedVariant = this.variants[0];
      this.loadingData = false;
      })
  }

  changeSelectedVariant(variant: BaseVariant) {
    this.selectedVariant = variant;
  }

  addToCart() {
    this.cartService.addProductToCart(this.selectedVariant);
  }
}
