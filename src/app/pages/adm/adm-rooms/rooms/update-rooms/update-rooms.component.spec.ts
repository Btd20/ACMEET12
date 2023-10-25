import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarRoomsComponent } from './update-rooms.component';

describe('AgregarEditarCityComponent', () => {
  let component: AgregarEditarRoomsComponent;
  let fixture: ComponentFixture<AgregarEditarRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEditarRoomsComponent]
    });
    fixture = TestBed.createComponent(AgregarEditarRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
