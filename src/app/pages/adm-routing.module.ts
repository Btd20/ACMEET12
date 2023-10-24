import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'homeAdm',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'bookings',
        loadChildren: () => import('./reserves/bookings/bookings.module').then(m => m.BookingsModule)
      },
      {
        path: 'meetingRoom',
        loadChildren: () => import('./reserves/meeting-room/meeting-room.module').then(m => m. MeetingRoomModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./users/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'admRooms',
        loadChildren: () => import('./adm/adm-rooms/adm-rooms.module').then(m => m.AdmRoomsModule)
      },
      {
        path: 'formReserve',
        loadChildren: () => import('./reserves/form-reserve/form-reserve.module').then(m => m.formReserveModule)
      },
      {
        path: 'editarPerfil',
        loadChildren: () => import('./users/profile/editar-profile/editar-profile.module').then(m =>m.ProfileModule)
      },
      {
        path: 'editarUsuario',
        loadChildren: () => import('./users/editar-usuarios/editar-usuarios.module').then(m =>m.EditarUsuariosModule)
      },
      {
        path: 'popRemove',
        loadChildren: () => import('./pop-remove-question/pop-remove-question.module').then(m =>m.PopRemoveQuestionModule)
      },
      {
        path: 'editarReserve/:reserveId', loadChildren: () => import('./reserves/editar-reserva/editar-reserva.module').then(m => m.EditarReservaModule)
      },
      {
        path: 'admReservas',
        loadChildren: () => import('./adm/adm-reservas/adm-reservas.module').then(m => m.AdmReservasModule)
      },

      {
        path: 'help',
        loadChildren: () => import('./help/help.module').then(m => m.HelpModule)
      },
      { path: '', redirectTo: '/home/homeAdm', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
