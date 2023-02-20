import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthenticatedGuard } from '../guards/user-authenticated.guard';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserDataComponent } from './components/user-data/user-data.component';

const routes: Routes = [
  { path: 'dashboard',
    component: UserDashboardComponent,
    children: [
      { path: 'data', component: UserDataComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAreaRoutingModule { }
