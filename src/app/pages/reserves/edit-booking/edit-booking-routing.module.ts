import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarReservaComponent } from './edit-booking.component';

const routes: Routes = [
  
  { path: '', component: EditarReservaComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarReservaRoutingModule { }
