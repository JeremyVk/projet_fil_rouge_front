import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/shop/services/book/book.service';
import { ProductService } from 'src/app/shop/services/product/product.service';
import {UrlService} from "../../../services/url/url.service";

@Component({
  selector: 'app-book-filters',
  templateUrl: './book-filters.component.html',
  styleUrls: ['./book-filters.component.css']
})
export class BookFiltersComponent implements OnInit, OnDestroy {
  bookFormats: Array<any> = [];
  formatsSelecteds: string = "";
  @Output() reloadProductsEmmiter = new EventEmitter<string>()
  private bookFormatSubscription = new Subscription();

  //MOBILES FILTERS
  isDisplayed: boolean = false;
  isMobileDevice: boolean = true
  deviceWidth: number = 0

  constructor(
    private bookService: BookService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    this.deviceWidth = window.innerWidth

    if (this.deviceWidth >= 1024) {
      this.isMobileDevice = false
    }

    this.bookFormatSubscription = this.bookService.bookFilterSubject$.subscribe(res => {
      this.bookFormats = res
    })

  }

  ngOnDestroy(): void {
    this.bookFormatSubscription.unsubscribe()
  }

  filterBooks() {
    this.toggleIsDisplayed()
    this.formatsSelecteds = this.bookFormats.filter(elt => elt.checked)
    .map(elt => elt.name)
    .join(',')

    let url = this.urlService.createUrl(null, this.formatsSelecteds)

    this.router.navigateByUrl('/books' + url)
    this.reloadProductsEmmiter.emit(url)
    this.bookService.editBookFilters(this.bookFormats)
  }

  toggleIsDisplayed() {
    this.isDisplayed = !this.isDisplayed;
  }

  cleanFilters() {
    this.bookFormats.forEach(format => {
      format.checked = false
    })
  }
}
