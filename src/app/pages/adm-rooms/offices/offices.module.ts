import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesRoutingModule } from './offices-routing.module';
import { ListaOfficeComponent } from './lista-office/lista-office.component';
import { VerOfficeComponent } from './ver-office/ver-office.component';
import { AgregarEditarOfficeComponent } from './agregar-editar-office/agregar-editar-office.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
   
    ListaOfficeComponent,
    VerOfficeComponent,
    AgregarEditarOfficeComponent
  ],
  imports: [
    CommonModule,
    OfficesRoutingModule,
    SharedModule
  ],
  exports: [
  
  ]
})
export class OfficesModule { }
