import { ComponentFixture, TestBed } from '@angular/core/testing';

import { helpComponent } from './help.component';

describe('helpComponent', () => {
  let component: helpComponent;
  let fixture: ComponentFixture<helpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [helpComponent]
    });
    fixture = TestBed.createComponent(helpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
