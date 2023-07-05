import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  createUrl(query: string|null = null, formats: string|null = null, page: number | null = null) {
    if (page === null) {
      page = Number(this.route.snapshot.queryParamMap.get('page'));
    }

    if (formats === null) {
      formats = this.route.snapshot.queryParamMap.get('formats');
    }

    if (!query) {
      query = this.route.snapshot.queryParamMap.get('query');
    }

    let url =  ''
    let nextSeparator = '?'

    if (formats) {
      url = `${url}${nextSeparator}formats=${formats}`
      nextSeparator = '&'
    }

    if (query) {
      url = `${url}${nextSeparator}query=${query}`
      nextSeparator = '&'
    }

    if (page !== 0) {
      url = `${url}${nextSeparator}page=${page}`
      nextSeparator = '&'
    }

    return url
  }
}
