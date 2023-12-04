import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSeeTicketComponent } from './help-see-ticket.component';

describe('HelpSeeTicketComponent', () => {
  let component: HelpSeeTicketComponent;
  let fixture: ComponentFixture<HelpSeeTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HelpSeeTicketComponent]
    });
    fixture = TestBed.createComponent(HelpSeeTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
