import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAreaRoutingModule } from './user-area-routing.module';
import { UserAuthenticatedGuard } from '../guards/user-authenticated.guard';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserAreaNavComponent } from './components/user-area-nav/user-area-nav.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ShopModule } from '../shop.module';
import { AppFormsModule } from 'src/app/app-forms/app-forms.module';
import { ButtonCtaComponent } from '../../buttons/components/button-cta/button-cta.component';
import { UserAddressesComponent } from './components/user-addresses/user-addresses.component';
import { ButtonsModule } from 'src/app/buttons/buttons.module';
import { UserCreateAddressComponent } from './components/user-create-address/user-create-address.component';
import { UserEditAddressComponent } from './components/user-edit-address/user-edit-address.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserAreaNavComponent,
    UserDataComponent,
    UserAddressesComponent,
    UserCreateAddressComponent,
    UserEditAddressComponent,
    UserOrdersComponent,
  ],
  imports: [
    CommonModule,
    UserAreaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AppFormsModule,
    ButtonsModule,
    PipesModule
  ],
  providers: [UserAuthenticatedGuard]
})
export class UserAreaModule { }
