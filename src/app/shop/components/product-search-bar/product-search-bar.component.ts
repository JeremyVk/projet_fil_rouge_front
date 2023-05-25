import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Article } from '../../interfaces/article';

@Component({
  selector: 'app-product-search-bar',
  templateUrl: './product-search-bar.component.html',
  styleUrls: ['./product-search-bar.component.css']
})
export class ProductSearchBarComponent implements OnInit {

  searchQuery: string = "";
  constructor() { }

  @Output() readonly productSearchQuery = new EventEmitter<string>();

  ngOnInit(): void {
  }

  searchProducts() {
    if (this.searchQuery.length > 0) {
      this.productSearchQuery.emit(this.searchQuery);
      this.searchQuery = ""
    }
  }

}
