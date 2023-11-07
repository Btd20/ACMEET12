import { RouterModule, Routes } from "@angular/router";
import { AdmHelpAnswComponent } from "./adm-helpansw.component";
import { NgModule } from "@angular/core";

const routes : Routes = [
    { path: '', component: AdmHelpAnswComponent}
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})export class AdmHelpAnswRoutingModule{}