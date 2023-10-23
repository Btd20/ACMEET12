import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PopRemoveQuestionComponent } from './pop-remove-question.component';



@NgModule({
  declarations: [
    PopRemoveQuestionComponent
  ],
  imports: [
    CommonModule,
     SharedModule
  ],
  exports: [
    PopRemoveQuestionComponent
  ]
})
export class  PopRemoveQuestionModule { }
