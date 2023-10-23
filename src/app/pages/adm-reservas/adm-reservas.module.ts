import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmReservasRoutingModule } from './adm-reservas-routing.module';
import { ListReservasComponent } from './list-reservas/list-reservas.component';
import { EditReservasComponent } from './edit-reservas/edit-reservas.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ListReservasComponent,
    EditReservasComponent
  ],
  imports: [
    CommonModule,
    AdmReservasRoutingModule,
    SharedModule
  ],
  exports: [
   ]
})
export class AdmReservasModule { }
