import { NgModule } from "@angular/core";
import { MakeReserveComponent } from "./make-booking.component";
import { CommonModule } from "@angular/common";
import { MakeReserveRoutingModule } from "./make-booking-routing-module.component";
import { SharedModule } from "../../../shared/shared.module";


@NgModule({
    declarations: [MakeReserveComponent],
    imports: [
        CommonModule,
        MakeReserveRoutingModule,
        SharedModule
    ],
    exports:[MakeReserveComponent]
})
export class makeBookingModule{}
