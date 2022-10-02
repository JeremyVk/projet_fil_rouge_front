import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../../Interfaces/article';
import { Book } from '../../Interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  bookUrl: string = `${environment.url}/api/books`;
  constructor(private http: HttpClient) { }


  getAllBooks() {
    return this.http.get<Array<Book>>(this.bookUrl);
  }

  findBookById(id: number) {
    return this.http.get<Article>(`${this.bookUrl}/${id}`)
  }
}
