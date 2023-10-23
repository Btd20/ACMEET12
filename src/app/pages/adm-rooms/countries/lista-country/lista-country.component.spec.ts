import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCountryComponent } from './lista-country.component';

describe('ListaCountryComponent', () => {
  let component: ListaCountryComponent;
  let fixture: ComponentFixture<ListaCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCountryComponent]
    });
    fixture = TestBed.createComponent(ListaCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
