import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthenticatedGuard } from '../guards/user-authenticated.guard';
import { UserAddressesComponent } from './components/user-addresses/user-addresses.component';
import { UserCreateAddressComponent } from './components/user-create-address/user-create-address.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { UserEditAddressComponent } from './components/user-edit-address/user-edit-address.component';

const routes: Routes = [
  { path: 'dashboard',
    component: UserDashboardComponent,
    children: [
      { path: 'data', component: UserDataComponent},
      { path: 'addresses', component: UserAddressesComponent,},
      { path: 'create-address', component: UserCreateAddressComponent},
      { path: 'edit-address/:id', component: UserEditAddressComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAreaRoutingModule { }
