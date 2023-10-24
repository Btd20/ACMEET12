import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReservasComponent } from './edit-booking.component';

describe('EditReservasComponent', () => {
  let component: EditReservasComponent;
  let fixture: ComponentFixture<EditReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReservasComponent]
    });
    fixture = TestBed.createComponent(EditReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
