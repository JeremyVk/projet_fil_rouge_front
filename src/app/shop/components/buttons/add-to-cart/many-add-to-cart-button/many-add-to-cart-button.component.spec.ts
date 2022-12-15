import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyAddToCartButtonComponent } from './many-add-to-cart-button.component';

describe('ManyAddToCartButtonComponent', () => {
  let component: ManyAddToCartButtonComponent;
  let fixture: ComponentFixture<ManyAddToCartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManyAddToCartButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManyAddToCartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
