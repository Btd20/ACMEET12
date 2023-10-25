import { RouterModule, Routes } from "@angular/router";
import { FormReserveComponent } from "./form-booking.component";
import { NgModule } from "@angular/core";

const routes : Routes = [
    { path: '', component: FormReserveComponent}
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})export class FormReserveRoutingModule{}