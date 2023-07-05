import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HydraView } from 'src/app/shop/interfaces/hydra-view';
import { ProductService } from 'src/app/shop/services/product/product.service';
import {UrlService} from "../../../services/url/url.service";

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
    private router: Router,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
  }

  ngDoCheck() {

  }

  changePage(url: string) {
    let urlToNavigate = url.replace('/api', '')
    url = this.urlService.createUrl(null, null, this.getUrlPageNumber(url))
    this.router.navigateByUrl(urlToNavigate)
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
