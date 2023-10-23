import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOfficeComponent } from './ver-office.component';

describe('VerOfficeComponent', () => {
  let component: VerOfficeComponent;
  let fixture: ComponentFixture<VerOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerOfficeComponent]
    });
    fixture = TestBed.createComponent(VerOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
