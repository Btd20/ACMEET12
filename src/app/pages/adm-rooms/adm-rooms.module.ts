import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoomsRoutingModule } from './adm-rooms-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    AdmRoomsRoutingModule,
    SharedModule
  ],
  exports: [
  
  ]
})
export class AdmRoomsModule { }
