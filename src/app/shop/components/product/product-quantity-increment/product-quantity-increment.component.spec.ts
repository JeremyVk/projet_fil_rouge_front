import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuantityIncrementComponent } from './product-quantity-increment.component';

describe('ProductQuantityIncrementComponent', () => {
  let component: ProductQuantityIncrementComponent;
  let fixture: ComponentFixture<ProductQuantityIncrementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductQuantityIncrementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductQuantityIncrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
