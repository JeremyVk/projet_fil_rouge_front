import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAddToCartButtonComponent } from './simple-add-to-cart-button.component';

describe('SimpleAddToCartButtonComponent', () => {
  let component: SimpleAddToCartButtonComponent;
  let fixture: ComponentFixture<SimpleAddToCartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleAddToCartButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleAddToCartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
