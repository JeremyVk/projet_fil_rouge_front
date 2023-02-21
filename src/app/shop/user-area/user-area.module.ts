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

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserAreaNavComponent,
    UserDataComponent,
  ],
  imports: [
    CommonModule,
    UserAreaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AppFormsModule,
  ],
  providers: [UserAuthenticatedGuard]
})
export class UserAreaModule { }
