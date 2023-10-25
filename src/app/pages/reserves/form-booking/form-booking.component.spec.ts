import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReserveComponent } from './form-booking.component';

describe('FormReserveComponent', () => {
  let component: FormReserveComponent;
  let fixture: ComponentFixture<FormReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormReserveComponent]
    });
    fixture = TestBed.createComponent(FormReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
