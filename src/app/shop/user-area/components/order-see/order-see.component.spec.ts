import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSeeComponent } from './order-see.component';

describe('OrderSeeComponent', () => {
  let component: OrderSeeComponent;
  let fixture: ComponentFixture<OrderSeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
