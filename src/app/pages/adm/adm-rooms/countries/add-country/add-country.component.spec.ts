import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCountryComponent } from './add-country.component';

describe('AgregarCountryComponent', () => {
  let component: AgregarCountryComponent;
  let fixture: ComponentFixture<AgregarCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarCountryComponent]
    });
    fixture = TestBed.createComponent(AgregarCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
