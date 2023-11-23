import { RouterModule, Routes } from "@angular/router";
import { HelpSeeTicketComponent } from "./help-see-ticket.component";
import { NgModule } from "@angular/core";

const routes : Routes = [
    { path: '', component: HelpSeeTicketComponent}
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})export class HelpSeeTicketRoutingModule{}