import { NgModule } from "@angular/core";
import { FormReserveComponent } from "./form-reserve.component";
import { CommonModule } from "@angular/common";
import { FormReserveRoutingModule } from "./form-reserve-routing-module.component";
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
    declarations: [FormReserveComponent],
    imports: [
        CommonModule,
        FormReserveRoutingModule,
        SharedModule
    ],
    exports:[FormReserveComponent]
})
export class formReserveModule{}
