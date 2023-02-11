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
import { CartPopupComponent } from './components/cart-popup/cart-popup.component';
import { CartPopupArticleComponent } from './components/cart-popup-article/cart-popup-article.component';
import { SpinnerDataLoaderComponent } from './components/spinner-data-loader/spinner-data-loader.component';
import { SimpleAddToCartButtonComponent } from './components/buttons/add-to-cart/simple-add-to-cart-button/simple-add-to-cart-button.component';
import { ManyAddToCartButtonComponent } from './components/buttons/add-to-cart/many-add-to-cart-button/many-add-to-cart-button.component';
import { LayerManyAddToCartButtonComponent } from './components/buttons/add-to-cart/layer-many-add-to-cart-button/layer-many-add-to-cart-button.component';
import { ButtonCtaComponent } from './components/buttons/button-cta/button-cta.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ProductQuantityIncrementComponent } from './components/product/product-quantity-increment/product-quantity-increment.component';
import { SelectVariantsComponent } from './components/select-variants/select-variants.component';
import { CheckoutCreateAddressComponent } from './components/order-tunnel/checkout-create-address/checkout-create-address.component';
import { AddressFormComponent } from './components/forms/address-form/address-form.component';
import { CheckoutSelectAddressComponent } from './components/order-tunnel/checkout-select-address/checkout-select-address.component';
import { OrderConfirmationComponent } from './components/order-tunnel/order-confirmation/order-confirmation.component';
import { PaginationComponent } from './components/pagination/pagination/pagination.component';
import { UserAuthenticatedGuard } from './guards/user-authenticated.guard';

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
    CartPopupComponent,
    CartPopupArticleComponent,
    SpinnerDataLoaderComponent,
    SimpleAddToCartButtonComponent,
    ManyAddToCartButtonComponent,
    LayerManyAddToCartButtonComponent,
    ButtonCtaComponent,
    CartPageComponent,
    CartItemComponent,
    ProductQuantityIncrementComponent,
    SelectVariantsComponent,
    CheckoutCreateAddressComponent,
    AddressFormComponent,
    CheckoutSelectAddressComponent,
    OrderConfirmationComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [ProductListComponent, HeaderComponent, ShowPricePipe],
  providers: [UserAuthenticatedGuard]
})
export class ShopModule {}
