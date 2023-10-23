import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitiesRoutingModule } from './cities-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { VerCityComponent } from './ver-city/ver-city.component';
import { ListCityComponent } from './list-city/list-city.component';
import { AgregarEditarCityComponent } from './agregar-editar-city/agregar-editar-city.component';


@NgModule({
  declarations: [
    ListCityComponent,
    VerCityComponent,
    AgregarEditarCityComponent,
    VerCityComponent
  ],
  imports: [
    CommonModule,
    CitiesRoutingModule,
    SharedModule
  ],
  exports: [
    
  ]
})
export class CitiesModule { }
