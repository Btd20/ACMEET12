import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './components/login/login.component';

//Modulos Angular Material
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OnlineStatusComponent } from './components/online-status/online-status.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OnlineStatusComponent
  ],
  imports: [
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    SharedModule,
    FontAwesomeModule,
    AuthConfigModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
