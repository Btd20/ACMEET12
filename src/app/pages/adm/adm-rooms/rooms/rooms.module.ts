import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ListRoomsComponent } from './read-rooms/read-rooms.component';
import { AgregarEditarRoomsComponent } from './update-rooms/update-rooms.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    ListRoomsComponent,
    AgregarEditarRoomsComponent,
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    RoomsRoutingModule,
    SharedModule
  ],
  exports: [
    AgregarEditarRoomsComponent
  ]
})
export class RoomsModule { }
