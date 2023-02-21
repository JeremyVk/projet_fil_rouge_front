import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCtaComponent } from './components/button-cta/button-cta.component';



@NgModule({
  declarations: [
    ButtonCtaComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonCtaComponent
  ]
})
export class ButtonsModule { }
