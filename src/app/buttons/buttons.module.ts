import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCtaComponent } from './components/button-cta/button-cta.component';
import { SpinnerDataLoaderComponent } from './components/spinner-data-loader/spinner-data-loader.component';



@NgModule({
  declarations: [
    ButtonCtaComponent,
    SpinnerDataLoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonCtaComponent,
    SpinnerDataLoaderComponent
  ]
})
export class ButtonsModule { }
