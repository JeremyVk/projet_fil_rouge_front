import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowPricePipe } from './show-price.pipe';
import { DateFormatPipe } from './date-format.pipe';
import { ItemPricePipe } from './item-price.pipe';
import { OrderTotalAmountPipe } from './order-total-amount.pipe';



@NgModule({
  declarations: [
    ShowPricePipe,
    DateFormatPipe,
    ItemPricePipe,
    OrderTotalAmountPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowPricePipe,
    DateFormatPipe,
    ItemPricePipe,
    OrderTotalAmountPipe
  ]
})
export class PipesModule { }
