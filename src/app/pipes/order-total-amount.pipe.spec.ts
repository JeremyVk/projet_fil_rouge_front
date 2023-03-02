import { OrderTotalAmountPipe } from './order-total-amount.pipe';

describe('OrderTotalAmountPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderTotalAmountPipe();
    expect(pipe).toBeTruthy();
  });
});
