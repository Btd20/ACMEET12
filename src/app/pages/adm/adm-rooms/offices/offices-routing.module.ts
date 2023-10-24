import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarOfficeComponent } from './agregar-editar-office/agregar-editar-office.component';
import { ListaOfficeComponent } from './lista-office/lista-office.component';
import { VerOfficeComponent } from './ver-office/ver-office.component';

const routes: Routes = [
  { path: '', redirectTo: 'listaOffices', pathMatch: 'full' },
  { path: 'listaOffices', component: ListaOfficeComponent },
  { path: 'agregarOffice', component: AgregarEditarOfficeComponent },
  { path: 'verOffice/:officeId', component: VerOfficeComponent }, // ":id" es el parametro que le pasara cuando el usuario le de clic a un pais
  { path: 'editarOffice/:officeId', component: AgregarEditarOfficeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficesRoutingModule { }
