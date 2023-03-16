import { Pipe, PipeTransform } from '@angular/core';
import { OrderItem } from '../shop/interfaces/order-item';

@Pipe({
  name: 'itemPrice'
})
export class ItemPricePipe implements PipeTransform {

  transform(item: OrderItem, ...args: unknown[]): number|undefined {
    if (!item.price || !item.quantity) {
      return undefined
    }
    return item.price * item.quantity 
  }
}
