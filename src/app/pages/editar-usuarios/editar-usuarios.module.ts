import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditarUsuariosComponent } from './editar-usuarios.component';


@NgModule({
  declarations: [
    EditarUsuariosComponent
  ],
  imports: [
    CommonModule,
     SharedModule
  ],
  exports: [
    EditarUsuariosComponent
  ]
})
export class EditarUsuariosModule { }