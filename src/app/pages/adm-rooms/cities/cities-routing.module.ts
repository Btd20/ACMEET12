import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarCityComponent } from './agregar-editar-city/agregar-editar-city.component';
import { ListCityComponent } from './list-city/list-city.component';
import { VerCityComponent } from './ver-city/ver-city.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'listaCity', pathMatch: 'full'
  },
  {
    path: 'listaCity', component: ListCityComponent
  },
  {
    path: 'agregarCity', component: AgregarEditarCityComponent
  },
  {
    path: 'verCity/:cityId', component: VerCityComponent
  }, // ":id" es el parametro que le pasara cuando el usuario le de clic a un pais
  {
    path: 'editarCity/:cityId', component: AgregarEditarCityComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
