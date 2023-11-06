import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { admHelpComponent } from './adm-help.component';

const routes: Routes = [
  { path: '', component: admHelpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmHelpRoutingModule { }
