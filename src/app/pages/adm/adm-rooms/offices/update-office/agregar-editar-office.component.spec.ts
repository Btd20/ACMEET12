import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarOfficeComponent } from './update-office.component';

describe('AgregarEditarOfficeComponent', () => {
  let component: AgregarEditarOfficeComponent;
  let fixture: ComponentFixture<AgregarEditarOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEditarOfficeComponent]
    });
    fixture = TestBed.createComponent(AgregarEditarOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
