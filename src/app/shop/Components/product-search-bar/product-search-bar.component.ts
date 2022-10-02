import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Article } from '../../Interfaces/article';

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

  searchProducts()
  {
    this.productSearchQuery.emit(this.searchQuery);
    this.searchQuery = ""
  }

}
