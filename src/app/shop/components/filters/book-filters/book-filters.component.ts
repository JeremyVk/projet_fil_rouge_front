import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/shop/services/book/book.service';
import { ProductService } from 'src/app/shop/services/product/product.service';

@Component({
  selector: 'app-book-filters',
  templateUrl: './book-filters.component.html',
  styleUrls: ['./book-filters.component.css']
})
export class BookFiltersComponent implements OnInit, OnDestroy {
  bookFormats: Array<any> = [];
  formatsSelecteds: string = "";
  @Output() reloadProductsEmmiter = new EventEmitter<string>()
  private bookFormatSubscription = new Subscription()

  constructor(
    private bookService: BookService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.bookFormatSubscription = this.bookService.bookFilterSubject$.subscribe(res => {
      this.bookFormats = res
    })
  }

  ngOnDestroy(): void {
    this.bookFormatSubscription.unsubscribe()
  }

  filterBooks() {
    this.formatsSelecteds = this.bookFormats.filter(elt => elt.checked)
    .map(elt => elt.name)
    .join(',')

    let url = this.productService.getUrlProductFiltered('books', this.formatsSelecteds)
    
    this.router.navigateByUrl('/' + url)
    this.reloadProductsEmmiter.emit('/api/books' + url)
    this.bookService.editBookFilters(this.bookFormats)
  }
}
