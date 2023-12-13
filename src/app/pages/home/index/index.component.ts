import { Component } from '@angular/core';
import { ProfileService } from '../../../shared/services/profile.service';
import { MakeReserveComponent } from '../../bookings/make-booking/make-booking.component';
import { MatDialog } from '@angular/material/dialog';
import { OidcSecurityService } from 'angular-auth-oidc-client';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class HomeComponent {

  constructor(private _userService: ProfileService, private oidcSecurityService: OidcSecurityService, private dialog: MatDialog){}

  ngOnInit(){

    const userName = sessionStorage.getItem('user');
    if(userName){
      this.ObtenerUsuario(userName);
    }
    const userId = sessionStorage.getItem('userId')
    this.oidcSecurityService.getAccessToken().subscribe(token => console.log(token))
  }

  ObtenerUsuario(userName: string){
    this._userService.getUserProfile(userName).subscribe(dataUser => {
      const userId =  dataUser.id;
      if(userId){
        sessionStorage.setItem('userId',userId);
        sessionStorage.setItem('userEmail',dataUser.email);
      }
    });
  }

  openDialogAgregarReserva(){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(MakeReserveComponent, {data: { pathname },  panelClass: 'no-scroll' });
  }

  
}
