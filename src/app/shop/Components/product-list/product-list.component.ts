import { Component, OnInit } from '@angular/core';
import { Book } from '../../Interfaces/book';
import { ProductService } from '../../Services/Product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  bookList: Array<Book> = [];

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks()
  {
    this.productService.getAllBooks().subscribe(res => {
      this.bookList = res;
    })
  }

}
