import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
      {
        path: 'cities',
        loadChildren: () => import('./cities/cities.module').then(m => m.CitiesModule)
      },
      {
        path: 'countries',
        loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)
      },
      {
        path: 'offices',
        loadChildren: () => import('./offices/offices.module').then(m => m.OfficesModule)
      },
      {
        path: 'rooms',
        loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule)
      } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoomsRoutingModule { }
