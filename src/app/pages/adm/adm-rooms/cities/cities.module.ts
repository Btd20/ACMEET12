import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CitiesRoutingModule } from './cities-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ListCityComponent } from './read-cities/read-city.component';
import { AgregarEditarCityComponent } from './update-cities/update-city.component';


@NgModule({
  declarations: [
    ListCityComponent,
    AgregarEditarCityComponent,
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule, 
    CitiesRoutingModule,
    SharedModule
  ],
  exports: [
    
  ]
})
export class CitiesModule { }
