import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarCountryComponent } from './agregar-editar-country/agregar-editar-country.component';
import { ListaCountryComponent } from './lista-country/lista-country.component';
import { VerCountryComponent } from './ver-country/ver-country.component';


const routes: Routes = [
  { path: '', redirectTo: 'listaCountries', pathMatch: 'full' },
  { path: 'listaCountries', component: ListaCountryComponent },
  { path: 'agregarCountry', component: AgregarEditarCountryComponent },
  { path: 'verCountry/:countryId', component: VerCountryComponent }, // ":id" es el parametro que le pasara cuando el usuario le de clic a un pais
  { path: 'editarCountry/:countryId', component: AgregarEditarCountryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
