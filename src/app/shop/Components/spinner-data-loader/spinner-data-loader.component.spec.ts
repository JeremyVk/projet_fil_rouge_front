import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerDataLoaderComponent } from './spinner-data-loader.component';

describe('SpinnerDataLoaderComponent', () => {
  let component: SpinnerDataLoaderComponent;
  let fixture: ComponentFixture<SpinnerDataLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerDataLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinnerDataLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
