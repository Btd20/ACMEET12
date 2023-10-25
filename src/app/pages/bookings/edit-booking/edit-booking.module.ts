import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarReservaRoutingModule } from './edit-booking-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { EditarReservaComponent } from './edit-booking.component';


@NgModule({
  declarations: [EditarReservaComponent],
  imports: [
    CommonModule,
    EditarReservaRoutingModule,
    SharedModule
  ],
  exports:[EditarReservaComponent]
})
export class EditarBookingModule { }
