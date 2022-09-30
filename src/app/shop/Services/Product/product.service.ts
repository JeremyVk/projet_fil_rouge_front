import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../Interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  getAllBooks() {
    return this.http.get<Array<Book>>('http://127.0.0.1:8000/api/books');
  }
}
