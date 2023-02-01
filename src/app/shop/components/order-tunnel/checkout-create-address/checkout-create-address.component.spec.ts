import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCreateAddressComponent } from './checkout-create-address.component';

describe('CheckoutCreateAddressComponent', () => {
  let component: CheckoutCreateAddressComponent;
  let fixture: ComponentFixture<CheckoutCreateAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutCreateAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutCreateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
