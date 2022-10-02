import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductTileComponent } from './Components/product-tile/product-tile.component';
import { HeaderComponent } from './Components/header/header.component';
import { ProductPageComponent } from './Components/product-page/product-page.component';
import { ProductSearchBarComponent } from './Components/product-search-bar/product-search-bar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductTileComponent,
    HeaderComponent,
    ProductPageComponent,
    ProductSearchBarComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule
  ],
  exports: [
    ProductListComponent,
    HeaderComponent
  ]
})
export class ShopModule { }
