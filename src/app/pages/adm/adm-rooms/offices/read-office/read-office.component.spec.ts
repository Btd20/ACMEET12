import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOfficeComponent } from './read-office.component';

describe('ListaOfficeComponent', () => {
  let component: ListaOfficeComponent;
  let fixture: ComponentFixture<ListaOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaOfficeComponent]
    });
    fixture = TestBed.createComponent(ListaOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
