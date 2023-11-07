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
        loadChildren: () => import('./bookings/booking/bookings.module').then(m => m.BookingsModule)
      },
      {
        path: 'meetingRoom',
        loadChildren: () => import('./bookings/meeting-room/meeting-room.module').then(m => m. MeetingRoomModule)
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
        loadChildren: () => import('./bookings/form-booking/form-booking.module').then(m => m.formBookingModule)
      },
      {
        path: 'makeReserve',
        loadChildren: () => import('./bookings/make-booking/make-booking.module').then(m => m.makeBookingModule)
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
        loadChildren: () => import('./alerts/alert.module').then(m =>m.PopRemoveQuestionModule)
      },
      {
        path: 'editarReserve/:reserveId', loadChildren: () => import('./bookings/edit-booking/edit-booking.module').then(m => m.EditarBookingModule)
      },
      {
        path: 'admReservas',
        loadChildren: () => import('./adm/adm-bookings/adm-bookings.module').then(m => m.AdmReservasModule)
      },
      {
        path: 'admHelp',
        loadChildren: () => import('./adm/adm-help/adm-help.module').then(m => m.HelpModule)
      },
      {
        path: 'admHelpAnsw',
        loadChildren: () => import('./adm/adm-helpansw/adm-helpansw.module').then(m => m.admHelpAnswModule)
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
