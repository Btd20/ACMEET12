import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './index/index.component';
import { SharedModule } from '../../shared/shared.module';
import { FooterModule } from './footer/footer.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FooterModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
