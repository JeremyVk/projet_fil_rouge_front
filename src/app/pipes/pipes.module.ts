import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowPricePipe } from './show-price.pipe';
import { DateFormatPipe } from './date-format.pipe';



@NgModule({
  declarations: [
    ShowPricePipe,
    DateFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowPricePipe,
    DateFormatPipe
  ]
})
export class PipesModule { }
