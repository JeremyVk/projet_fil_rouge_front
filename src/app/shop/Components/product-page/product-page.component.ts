import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../Interfaces/book';
import { ProductService } from '../../Services/Product/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  book: Book = {};

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('productId'))!;
    this.getBook(id);
  }

  getBook(id:number) {
    this.productService.findBookById(id).subscribe(res => {
      this.book = res;
      })
  }


}
