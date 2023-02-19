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


  generateUrlForGetService()
  {
    let pageNumber = Number(this.route.snapshot.queryParamMap.get('page'));
    let formats = this.route.snapshot.queryParamMap.get('formats');
    let currentRoute = this.router.url.split('?')[0]
    let nextSeparator = '?'
    let url =  `/api${currentRoute}/`

    if (formats) {
      url = `${url}${nextSeparator}formats=${formats}`
      nextSeparator = '&'
    }

    if (pageNumber) {
      url = `${url}${nextSeparator}page=${pageNumber}`
    }

    return url
  }
}
