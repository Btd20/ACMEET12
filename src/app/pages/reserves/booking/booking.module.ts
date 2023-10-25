import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { BookingsRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { formBookingModule } from '../form-booking/form-booking.module';



@NgModule({
  declarations: [BookingComponent],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    formBookingModule,
    SharedModule
  ],
  exports: [BookingComponent]
})
export class BookingsModule { }
