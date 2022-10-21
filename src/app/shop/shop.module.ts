import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductTileComponent } from './Components/product-tile/product-tile.component';
import { HeaderComponent } from './Components/header/header.component';
import { ProductPageComponent } from './Components/product-page/product-page.component';
import { ProductSearchBarComponent } from './Components/product-search-bar/product-search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { ShowPricePipe } from '../pipes/show-price.pipe';
import { AppModule } from '../app.module';

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
