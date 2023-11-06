import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeReserveComponent } from './make-booking.component';

describe('MakeReserveComponent', () => {
  let component: MakeReserveComponent;
  let fixture: ComponentFixture<MakeReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeReserveComponent]
    });
    fixture = TestBed.createComponent(MakeReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
