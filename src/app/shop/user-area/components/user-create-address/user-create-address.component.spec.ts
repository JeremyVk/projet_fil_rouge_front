import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateAddressComponent } from './user-create-address.component';

describe('UserCreateAddressComponent', () => {
  let component: UserCreateAddressComponent;
  let fixture: ComponentFixture<UserCreateAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCreateAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCreateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
