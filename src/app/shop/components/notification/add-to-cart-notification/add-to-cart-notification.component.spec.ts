import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartNotificationComponent } from './add-to-cart-notification.component';

describe('AddToCartNotificationComponent', () => {
  let component: AddToCartNotificationComponent;
  let fixture: ComponentFixture<AddToCartNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToCartNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToCartNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
