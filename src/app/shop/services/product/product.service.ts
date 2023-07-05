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
  bookUrl: string = `${environment.url}/api/books`;
  constructor(
    private http: HttpClient,
    ) { }

  getAllArticlesWithParams(params: string|null = null) {
    if (params) {
      return this.http.get<Hydra>(`${this.bookUrl}${params}`)
    }

    return this.http.get<Hydra>(this.bookUrl)
  }

  getAllArticlesPageNumber(pageNumber: number|null = null) {
    return this.http.get<Hydra>(`${this.bookUrl}?page=${pageNumber}`)
  }

  findBookById(id: number) {
    return this.http.get<Article>(`${this.bookUrl}/${id}`)
  }

  getBooksBySearch(search: string) {
    return this.http.get<Hydra>(`${this.bookUrl}/?query=${search}`);
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

  getUrlProductFiltered(type: string ,formats: string|null) {
    let url = ''
    let oneFilter = false
    if (formats) {
      url = url + `?formats=${formats}`
      oneFilter = true
    }

    return url
  }
}
