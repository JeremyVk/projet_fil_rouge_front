import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAreaNavComponent } from './user-area-nav.component';

describe('UserAreaNavComponent', () => {
  let component: UserAreaNavComponent;
  let fixture: ComponentFixture<UserAreaNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAreaNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAreaNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
