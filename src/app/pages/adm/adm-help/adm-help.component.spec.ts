import { ComponentFixture, TestBed } from '@angular/core/testing';

import { admHelpComponent } from './adm-help.component';

describe('admHelpComponent', () => {
  let component: admHelpComponent;
  let fixture: ComponentFixture<admHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [admHelpComponent]
    });
    fixture = TestBed.createComponent(admHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
