import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { BookingsRoutingModule } from './bookings-routing.module';
import { BookingComponent } from './bookings.component';
import { formReserveModule } from '../form-reserve/form-reserve.module';



@NgModule({
  declarations: [BookingComponent],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    formReserveModule,
    SharedModule
  ],
  exports: [BookingComponent]
})
export class BookingsModule { }
