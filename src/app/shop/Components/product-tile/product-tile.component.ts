import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../Interfaces/book';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css']
})
export class ProductTileComponent implements OnInit {
  @Input() book: Book = {};
  constructor() { }

  ngOnInit(): void {
  }

}
