import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarCityComponent } from './update-city.component';

describe('AgregarEditarCityComponent', () => {
  let component: AgregarEditarCityComponent;
  let fixture: ComponentFixture<AgregarEditarCityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEditarCityComponent]
    });
    fixture = TestBed.createComponent(AgregarEditarCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
