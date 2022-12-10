import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { elementAt, map, mergeMap, pipe, reduce, tap, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartPopupArticleComponent } from '../../components/cart-popup-article/cart-popup-article.component';
import { Article } from '../../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  bookUrl: string = `${environment.url}/api/books`;
  constructor(
    private http: HttpClient,
    ) { }


  getAllBooks() {
    return this.http.get<Array<Article>>(this.bookUrl)
  }

  findBookById(id: number) {
    return this.http.get<Article>(`${this.bookUrl}/${id}`)
  }

  getBooksBySearch(search: string) {
    return this.http.get<Array<Article>>(`${this.bookUrl}/?query=${search}`);
  }

  getMaxAvailable(product: Article): number {
    if (product.quantity === undefined) {
      return 0;
    }

    // if (product.stock && product.stock > 0) {
    //   return product.stock - product.quantity;
    // }

    return 0;
  }
}
