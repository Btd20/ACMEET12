import { RouterModule, Routes } from "@angular/router";
import { MakeReserveComponent } from "./make-booking.component";
import { NgModule } from "@angular/core";

const routes : Routes = [
    { path: '', component: MakeReserveComponent}
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})export class MakeReserveRoutingModule{}