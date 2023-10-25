import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmReservasRoutingModule } from './adm-bookings-routing.module';
import { ListReservasComponent } from './read-bookings/read-booking.component';
import { EditReservasComponent } from './edit-bookings/edit-booking.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ListReservasComponent,
    EditReservasComponent
  ],
  imports: [
    CommonModule,
    AdmReservasRoutingModule,
    SharedModule
  ],
  exports: [
   ]
})
export class AdmReservasModule { }
