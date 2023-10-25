import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarCountryComponent } from './update-country.component';

describe('AgregarEditarCountryComponent', () => {
  let component: AgregarEditarCountryComponent;
  let fixture: ComponentFixture<AgregarEditarCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEditarCountryComponent]
    });
    fixture = TestBed.createComponent(AgregarEditarCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
