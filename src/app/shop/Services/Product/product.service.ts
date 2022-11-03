import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  bookUrl: string = `${environment.url}/api/books`;
  constructor(private http: HttpClient) { }


  getAllBooks() {
    return this.http.get<Array<Article>>(this.bookUrl);
  }

  // getAllArticles() {
  //   return this.http.get<Array<Article>>()
  // }

  findBookById(id: number) {
    return this.http.get<Article>(`${this.bookUrl}/${id}`)
  }

  getBooksBySearch(search: string) {
    return this.http.get<Array<Article>>(`${this.bookUrl}/?query=${search}`);
  }
}
