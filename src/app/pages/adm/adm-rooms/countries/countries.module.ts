import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { AgregarEditarCountryComponent } from './update-country/update-country.component';
import { ListaCountryComponent } from './read-country/read-country.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AgregarCountryComponent } from './add-country/add-country.component';


@NgModule({
  declarations: [
    AgregarEditarCountryComponent,
    ListaCountryComponent,
    AgregarCountryComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule
  ],
  exports: [

  ]
})
export class CountriesModule { }
