import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { helpComponent } from './help.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    helpComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule,
     SharedModule
  ],
  exports: [
    helpComponent
  ]
})
export class HelpModule { }
