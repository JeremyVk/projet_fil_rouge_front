import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncRoutingModule } from './inc-routing.module';
import { NavigationComponent } from './Components/navigation/navigation.component';


@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    IncRoutingModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class IncModule { }
