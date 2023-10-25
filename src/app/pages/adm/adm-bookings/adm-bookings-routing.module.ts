import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReservasComponent } from './read-bookings/read-booking.component';
import { EditarReservaComponent } from '../../bookings/edit-booking/edit-booking.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'listReservas', pathMatch: 'full'
  },
  {
    path: 'listReservas', component: ListReservasComponent
  },
  {
    path: 'agregarReserva',component:ListReservasComponent
  },
 // ":id" es el parametro que le pasara cuando el usuario le de clic a un pais
  {
    path: 'editarReserva/:reservaId', component: EditarReservaComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmReservasRoutingModule { }
