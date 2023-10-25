import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoomsComponent } from './read-rooms.component';

describe('ListRoomComponent', () => {
  let component: ListRoomsComponent;
  let fixture: ComponentFixture<ListRoomsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ListRoomsComponent]
    });
    fixture = TestBed.createComponent(ListRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
