import { NgModule } from "@angular/core";
import { AdmHelpAnswComponent } from "./adm-helpansw.component";
import { CommonModule } from "@angular/common";
import { AdmHelpAnswRoutingModule } from "./adm-helpansw-routing-module.component";
import { SharedModule } from "../../../shared/shared.module";


@NgModule({
    declarations: [AdmHelpAnswComponent],
    imports: [
        CommonModule,
        AdmHelpAnswRoutingModule,
        SharedModule
    ],
    exports:[AdmHelpAnswComponent]
})
export class admHelpAnswModule{}
