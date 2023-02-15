import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hydra } from '../../interfaces/hydra';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookFormatUrl = `${environment.url}/api/book_formats`;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  getBookFormats() {
    let formatFilter = this.route.snapshot.queryParamMap.get('formats')?.split(',')

    return this.http.get<Hydra>(this.bookFormatUrl).pipe(
      map(elt => {
        return elt['hydra:member'].map(format => {
          if (formatFilter?.find(elt => elt === format.name)) {
            return {name: format.name, checked: true}
          }
          return {name: format.name, checked: false}
        })
      })
    )
  }
}
