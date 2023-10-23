import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCountryComponent } from './ver-country.component';

describe('VerCountryComponent', () => {
  let component: VerCountryComponent;
  let fixture: ComponentFixture<VerCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerCountryComponent]
    });
    fixture = TestBed.createComponent(VerCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
