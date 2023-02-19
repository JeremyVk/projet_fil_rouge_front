import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../interfaces/article';
import { Book } from '../../interfaces/book';
import { Hydra } from '../../interfaces/hydra';
import { HydraView } from '../../interfaces/hydra-view';
import { ProductService } from '../../services/product/product.service';
import { UrlService } from '../../services/url/url.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService
    ) { }

  articleList: Array<Article> = [];
  productSearchQuery: string = '';
  trueBookListLength: string = "";
  isLoading = false;
  pagination: HydraView = {}
  formats: string|null = null;

  ngOnInit(): void {
    this.formats = this.route.snapshot.queryParamMap.get("formats");
    this.getAllBooks()
  }

  getAllBooks(url: string|null = null)
  {
    this.isLoading = true;

    if (!url) {
      url = this.urlService.generateUrlForGetService()
    }

    return this.productService.getAllArticlesByUrl(url).subscribe(res => {      
      this.consumeResponse(res)
    })
  }

  refreshBookList(productSearchQuery: string) {
    this.isLoading = true;
    this.productService.getBooksBySearch(productSearchQuery).subscribe(res => {
      
      this.articleList = res['hydra:member'];
      this.pagination = res['hydra:view']
      this.isLoading = false;
      this.productSearchQuery = productSearchQuery;
      this.trueBookListLength =  `${this.articleList.length} ${this.articleList.length > 1 ? 'résultats' : 'résultat'}`;
    })
  }


  consumeResponse(response: Hydra) {
        this.articleList = response['hydra:member'];
        this.pagination = response['hydra:view']
        this.isLoading = false;
        this.productSearchQuery = "";
        this.formats = null
  }
}
