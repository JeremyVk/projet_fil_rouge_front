import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerManyAddToCartButtonComponent } from './layer-many-add-to-cart-button.component';

describe('LayerManyAddToCartButtonComponent', () => {
  let component: LayerManyAddToCartButtonComponent;
  let fixture: ComponentFixture<LayerManyAddToCartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerManyAddToCartButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayerManyAddToCartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
