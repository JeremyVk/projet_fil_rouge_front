import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.css']
})
export class ProductTileComponent implements OnInit {
  @Input() article: Article = {};
  constructor() { }

  ngOnInit(): void {
  }

}
