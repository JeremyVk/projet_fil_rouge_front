import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article';
import { Book } from '../../interfaces/book';
import { HydraView } from '../../interfaces/hydra-view';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productService: ProductService) { }

  articleList: Array<Article> = [];
  productSearchQuery: string = '';
  trueBookListLength: string = "";
  isLoading = false;
  pagination: HydraView = {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks(url: string|null = null)
  {
    this.isLoading = true;
    this.productService.getAllArticles(url).subscribe(res => {
      console.log(res);
      
      this.articleList = res['hydra:member'];
      this.pagination = res['hydra:view']
      this.isLoading = false;
      this.productSearchQuery = "";
    })
  }

  refreshBookList(productSearchQuery: string) {
    this.isLoading = true;
    this.productService.getBooksBySearch(productSearchQuery).subscribe(res => {
      this.articleList = res;
      this.isLoading = false;
      this.productSearchQuery = productSearchQuery;
      this.trueBookListLength =  `${this.articleList.length} ${this.articleList.length > 1 ? 'résultats' : 'résultat'}`;
    })
  }
}
