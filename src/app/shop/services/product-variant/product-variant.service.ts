import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseVariant } from '../../interfaces/baseVariant';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService {
private productVariantUrl: string = `${environment.url}/api/base_variants`
  constructor(
    private http: HttpClient
  ) { }

  getRequestedVariants(variantIds: Array<any>) {
    return this.http.get<{'hydra:member': Array<BaseVariant>}>(`${this.productVariantUrl}?id=${variantIds}`).pipe(
      map(elt => elt["hydra:member"])
    )
  }
}
