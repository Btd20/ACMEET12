import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmHelpRoutingModule } from './adm-help-routing.module';
import { admHelpComponent } from './adm-help.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    admHelpComponent
  ],
  imports: [
    CommonModule,
    AdmHelpRoutingModule,
     SharedModule
  ],
  exports: [
    admHelpComponent
  ]
})
export class HelpModule { }
