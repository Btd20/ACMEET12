import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { EditarProfileComponent } from './editar-profile.component';


@NgModule({
  declarations: [
    EditarProfileComponent
  ],
  imports: [
    CommonModule,
     SharedModule
  ],
  exports: [
    EditarProfileComponent
  ]
})
export class ProfileModule { }
