import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmHelpAnswComponent } from './adm-helpansw.component';

describe('AdmHelpAnswComponent', () => {
  let component: AdmHelpAnswComponent;
  let fixture: ComponentFixture<AdmHelpAnswComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmHelpAnswComponent]
    });
    fixture = TestBed.createComponent(AdmHelpAnswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
