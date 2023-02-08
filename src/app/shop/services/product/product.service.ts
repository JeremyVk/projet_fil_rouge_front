import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { elementAt, map, mergeMap, pipe, reduce, tap, switchMap, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article } from '../../interfaces/article';
import { BaseVariant } from '../../interfaces/baseVariant';
import { Hydra } from '../../interfaces/hydra';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  bookUrl: string = `${environment.url}/api/base_articles`;
  constructor(
    private http: HttpClient,
    ) { }


  // getAllBooks() {
  //   return this.http.get<{'hydra:member': Array<Article>}>(this.bookUrl).pipe(
  //     map((elt) => elt['hydra:member'])
  //   )
  // }

  getAllArticles(url: string|null = null) {
    console.log(url);
    
    if (url) {
      return this.http.get<Hydra>(`${environment.url}${url}`)
    }
  
    return this.http.get<Hydra>(this.bookUrl)
  }

  findBookById(id: number) {
    return this.http.get<Article>(`${this.bookUrl}/${id}`)
  }

  getBooksBySearch(search: string) {
    return this.http.get<{'hydra:member': Array<Article>}>(`${this.bookUrl}/?query=${search}`).pipe(
      map((elt) => elt['hydra:member'])
    );
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

  getProductImage(variant: BaseVariant): Observable<string | undefined> {
      return this.http.get<Article>(`${environment.url}${variant.parent}`).pipe(
        map((elt) => elt.image)
      )
  }

  getParent(variant: BaseVariant): Observable<Article> {    
    return this.http.get<Article>(`${environment.url}${variant.parent}`)
  }

  getVariantsPrice(variant: BaseVariant): number {
    if(variant.unitPrice && variant.quantity) {
          return variant.unitPrice * variant.quantity
    }
    return 0
  }
}
