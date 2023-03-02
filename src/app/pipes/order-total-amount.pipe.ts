import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../shop/interfaces/order';

@Pipe({
  name: 'orderTotalAmount'
})
export class OrderTotalAmountPipe implements PipeTransform {

  transform(order: Order, ...args: unknown[]): number {
    if (order.amount !== undefined && order.shippingAmount !== undefined) {
      return order.amount + order.shippingAmount
    }
    return 0;
  }

}
