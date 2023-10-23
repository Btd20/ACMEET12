import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarReservaRoutingModule } from './editar-reserva-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditarReservaComponent } from './EditarReservaComponent';


@NgModule({
  declarations: [EditarReservaComponent],
  imports: [
    CommonModule,
    EditarReservaRoutingModule,
    SharedModule
  ],
  exports:[EditarReservaComponent]
})
export class EditarReservaModule { }
