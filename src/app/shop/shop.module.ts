import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductTileComponent } from './components/product-tile/product-tile.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductSearchBarComponent } from './components/product-search-bar/product-search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { ShowPricePipe } from '../pipes/show-price.pipe';
import { AppModule } from '../app.module';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductTileComponent,
    HeaderComponent,
    ProductPageComponent,
    ProductSearchBarComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    ShowPricePipe,
    CartComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [ProductListComponent, HeaderComponent, ShowPricePipe],
})
export class ShopModule {}
