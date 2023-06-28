import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../interfaces/article';
import { Book } from '../../interfaces/book';
import { Hydra } from '../../interfaces/hydra';
import { HydraView } from '../../interfaces/hydra-view';
import { ProductService } from '../../services/product/product.service';
import { UrlService } from '../../services/url/url.service';
import {BookService} from "../../services/book/book.service";
import {BookFiltersComponent} from "../filters/book-filters/book-filters.component";

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
    private urlService: UrlService,
    ) { }

  articleList: Array<Article> = [];
  productSearchQuery: string = '';
  trueBookListLength: string = "";
  isLoading = false;
  pagination: HydraView = {}
  formats: string|null = null;
  error: string = ''
  @ViewChild(BookFiltersComponent) child: BookFiltersComponent | undefined

  ngOnInit(): void {
    this.formats = this.route.snapshot.queryParamMap.get("formats");
    this.getAllBooks()
  }

  getAllBooks(url: string|null = null)
  {
    this.isLoading = true;

    if (!url) {
      url = this.urlService.createUrl()
    }

    return this.productService.getAllArticlesWithParams(url).subscribe({
      next: (res) => {
        this.consumeResponse(res)
      },
      error: (error) => {
        this.error = error.message
      }
    })
  }

  refreshBookList(productSearchQuery: string) {
    this.isLoading = true;
    let url = this.urlService.createUrl(productSearchQuery, null, 0)
    this.router.navigateByUrl(`books${url}`)
    this.productService.getAllArticlesWithParams(url).subscribe({
      next: (res) => {
        this.consumeResponse(res)
      },
      error: (e) => {
        this.error = e
      }
    })
  }

  restoreBooks() {
    this.router.navigateByUrl('books')
    this.child?.cleanFilters()
    this.isLoading = true
    this.productService.getAllArticlesWithParams().subscribe({
      next: (res) => {
        this.consumeResponse(res)
      },
      error: (e) => {
        this.error = e
      }
    })
  }

  consumeResponse(response: Hydra) {
        this.articleList = response['hydra:member'];
        this.pagination = response['hydra:view']
        this.isLoading = false;
        this.productSearchQuery = "";
        this.formats = null;
        this.productSearchQuery = this.route.snapshot.queryParamMap.get('query') ?? '';
        if (this.productSearchQuery.length > 0) {
          this.displayResultLength()
        }
  }

  displayResultLength() {
    this.trueBookListLength =  `${this.articleList.length} ${this.articleList.length > 1 ? 'résultats' : 'résultat'}`;
  }
}
