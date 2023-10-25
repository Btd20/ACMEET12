import { NgModule } from "@angular/core";
import { FormReserveComponent } from "./form-booking.component";
import { CommonModule } from "@angular/common";
import { FormReserveRoutingModule } from "./form-booking-routing-module.component";
import { SharedModule } from "../../../shared/shared.module";


@NgModule({
    declarations: [FormReserveComponent],
    imports: [
        CommonModule,
        FormReserveRoutingModule,
        SharedModule
    ],
    exports:[FormReserveComponent]
})
export class formBookingModule{}
