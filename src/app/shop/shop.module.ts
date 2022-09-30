import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductTileComponent } from './Components/product-tile/product-tile.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductTileComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ShopModule { }
