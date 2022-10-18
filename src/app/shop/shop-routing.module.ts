import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductPageComponent } from './Components/product-page/product-page.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:productId', component: ProductPageComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
