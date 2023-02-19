import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAreaRoutingModule } from './user-area-routing.module';
import { UserAuthenticatedGuard } from '../guards/user-authenticated.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';


@NgModule({
  declarations: [
    UserDashboardComponent
  ],
  imports: [
    CommonModule,
    UserAreaRoutingModule
  ],
  providers: [UserAuthenticatedGuard]
})
export class UserAreaModule { }
