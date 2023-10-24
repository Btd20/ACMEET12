import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCityComponent } from './ver-city.component';

describe('VerCityComponent', () => {
  let component: VerCityComponent;
  let fixture: ComponentFixture<VerCityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerCityComponent]
    });
    fixture = TestBed.createComponent(VerCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
