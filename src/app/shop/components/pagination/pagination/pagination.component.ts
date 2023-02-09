import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    
  }

  changePage(url: string) {
    let pageNumber = this.getUrlPageNumber(url);

    this.router.navigateByUrl('/?page=' + pageNumber)
  
    this.changePageEmmiter.emit(url)
  }

  getUrlPageNumber(url: string): number
  {
    return Number(url[url.length - 1]);
  }

  isManyPagesBetween(url1: string, url2: string) {
    let number1 = this.getUrlPageNumber(url1)
    let number2 = this.getUrlPageNumber(url2)

    return number1 - number2 < - 1
  }

}
