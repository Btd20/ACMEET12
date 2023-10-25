import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ListRoomsComponent } from './read-rooms/list-rooms.component';
import { AgregarEditarRoomsComponent } from './update-rooms/agregar-editar-rooms.component';


@NgModule({
  declarations: [
    ListRoomsComponent,
    AgregarEditarRoomsComponent,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    SharedModule
  ],
  exports: [
    AgregarEditarRoomsComponent
  ]
})
export class RoomsModule { }
