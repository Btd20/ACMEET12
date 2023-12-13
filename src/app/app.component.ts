import { Component } from '@angular/core';
import { ConnectionStatusService } from './shared/services/connection-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ACMEFrontendVersion3';
  isOnline!: boolean;
  constructor(
              private _connectionService: ConnectionStatusService,
              private _snackBar: MatSnackBar,
              private oidSecurityService: OidcSecurityService){}
  ngOnInit(){
    this._connectionService.isOnline().subscribe((online) => {
      this.isOnline = online;
      if(!this.isOnline){
        this.mensajeErrorExito("does not have an internet connection");
      }
    });
    this.oidSecurityService.checkAuth().subscribe(({isAuthenticated, userData}) => null);
  }
  mensajeErrorExito(texto: string) {
    this._snackBar.open(`${texto}`, '', {
      duration: 8000,
      verticalPosition: 'bottom'
    });
  }
}
