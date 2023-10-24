import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservasComponent } from './read-booking.component';

describe('ListReservasComponent', () => {
  let component: ListReservasComponent;
  let fixture: ComponentFixture<ListReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListReservasComponent]
    });
    fixture = TestBed.createComponent(ListReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
