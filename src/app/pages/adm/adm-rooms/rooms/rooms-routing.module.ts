import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEditarRoomsComponent } from './agregar-editar-rooms/agregar-editar-rooms.component';
import { ListRoomsComponent } from './list-rooms/list-rooms.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'listaRoom', pathMatch: 'full'
  },
  {
    path: 'listaRoom', component: ListRoomsComponent
  },
  {
    path: 'agregarRoom', component: AgregarEditarRoomsComponent
  },
  // ":id" es el parametro que le pasara cuando el usuario le de clic a un pais
  {
    path: 'editarRoom/:meetingRoomId', component: AgregarEditarRoomsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
