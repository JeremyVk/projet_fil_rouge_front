import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HydraView } from 'src/app/shop/interfaces/hydra-view';
import { ProductService } from 'src/app/shop/services/product/product.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() pagination: HydraView = {};
  @Output() changePageEmmiter = new EventEmitter<string>();
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    console.log(this.pagination);
  }

  ngDoCheck() {
    console.log(this.pagination);
    
  }

  changePage(url: string) {
    console.log(url);
    
    this.changePageEmmiter.emit(url)
  }

}
