import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { PopRemoveQuestionComponent } from './alerts/alert.component';
import { ChangePasswordComponent } from './users/profile/change-password/change-password.component';
import { HelpSeeTicketComponent } from './help-see-ticket/help-see-ticket.component';



@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ChangePasswordComponent,
    HelpSeeTicketComponent

  ],
  imports: [
    CommonModule,
    AdmRoutingModule,
    SharedModule

  ]
})
export class AdmModule { }
