import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/shop/services/book/book.service';
import { ProductService } from 'src/app/shop/services/product/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-filters',
  templateUrl: './book-filters.component.html',
  styleUrls: ['./book-filters.component.css']
})
export class BookFiltersComponent implements OnInit, OnChanges {
  bookFormats: Array<any> = [];
  formatsSelecteds: string = "";
  @Output() reloadProductsEmmiter = new EventEmitter<string>()

  constructor(
    private bookService: BookService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.bookService.getBookFormats().subscribe({
      next: res => {
        this.bookFormats = res;
        console.log(res);

      },
      error: e => {

      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
  }

  filterBooks(formatForm: any) {
    this.formatsSelecteds = this.bookFormats.filter(elt => elt.checked)
    .map(elt => elt.name)
    .join(',')

    let url = this.productService.getUrlProductFiltered('books', this.formatsSelecteds)
    
    this.router.navigateByUrl('/' + url)
    this.reloadProductsEmmiter.emit('/api/books' + url)
  }
}
