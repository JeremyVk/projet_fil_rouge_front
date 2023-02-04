import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { RegisterComponent } from './components/register/register.component';
import {
  CheckoutCreateAddressComponent
} from "./components/order-tunnel/checkout-create-address/checkout-create-address.component";
import { CheckoutSelectAddressComponent } from './components/order-tunnel/checkout-select-address/checkout-select-address.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:productId', component: ProductPageComponent },
  { path: 'product/:productType/:productId', component: ProductPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout/create-address', component: CheckoutCreateAddressComponent },
  { path: 'checkout/select-address', component: CheckoutSelectAddressComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
