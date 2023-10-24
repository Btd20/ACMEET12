import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuariosComponent } from './editar-usuarios.component';

describe('EditarUsuariosComponent', () => {
  let component: EditarUsuariosComponent;
  let fixture: ComponentFixture<EditarUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarUsuariosComponent]
    });
    fixture = TestBed.createComponent(EditarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
