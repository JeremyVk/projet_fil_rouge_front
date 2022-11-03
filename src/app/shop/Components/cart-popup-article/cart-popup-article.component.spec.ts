import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPopupArticleComponent } from './cart-popup-article.component';

describe('CartPopupArticleComponent', () => {
  let component: CartPopupArticleComponent;
  let fixture: ComponentFixture<CartPopupArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartPopupArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPopupArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
