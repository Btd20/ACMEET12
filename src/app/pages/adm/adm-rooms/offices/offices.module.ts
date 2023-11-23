import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficesRoutingModule } from './offices-routing.module';
import { ListaOfficeComponent } from './read-office/read-office.component';
import { AgregarEditarOfficeComponent } from './update-office/update-office.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    ListaOfficeComponent,
    AgregarEditarOfficeComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule, 
    OfficesRoutingModule,
    SharedModule
  ],
  exports: [
  
  ]
})
export class OfficesModule { }
