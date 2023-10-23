import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { AgregarEditarCountryComponent } from './agregar-editar-country/agregar-editar-country.component';
import { ListaCountryComponent } from './lista-country/lista-country.component';
import { VerCountryComponent } from './ver-country/ver-country.component';
import { SharedModule } from '../../../shared/shared.module';
import { AgregarCountryComponent } from './agregar-country/agregar-country.component';


@NgModule({
  declarations: [
    AgregarEditarCountryComponent,
    ListaCountryComponent,
    VerCountryComponent,
    AgregarCountryComponent],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class CountriesModule { }
