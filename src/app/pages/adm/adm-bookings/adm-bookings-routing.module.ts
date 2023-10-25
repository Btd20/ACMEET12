import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD:src/app/pages/adm/adm-reservas/adm-reservas-routing.module.ts
import { ListReservasComponent } from './list-reservas/list-reservas.component';
import { EditarReservaComponent } from '../../reserves/edit-booking/edit-booking.component';
=======
import { ListReservasComponent } from './read-bookings/read-booking.component';
import { EditarReservaComponent } from '../../bookings/edit-booking/EditarReservaComponent';
>>>>>>> f877470fe2cb36aaa176a456db2824af01cf8565:src/app/pages/adm/adm-bookings/adm-bookings-routing.module.ts

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
