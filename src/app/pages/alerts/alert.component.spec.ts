import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopRemoveQuestionComponent } from './alert.component';

describe('PopRemoveQuestionComponent', () => {
  let component: PopRemoveQuestionComponent;
  let fixture: ComponentFixture<PopRemoveQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopRemoveQuestionComponent]
    });
    fixture = TestBed.createComponent(PopRemoveQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
