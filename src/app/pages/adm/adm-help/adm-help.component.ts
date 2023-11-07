import { Component } from '@angular/core';
import { ProfileService } from '../../../shared/services/profile.service';
import { MakeReserveComponent } from '../../bookings/make-booking/make-booking.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-help',
  templateUrl: './adm-help.component.html',
  styleUrls: ['./adm-help.component.css']
})
export class admHelpComponent {

  constructor(private _userService: ProfileService, private dialog: MatDialog){}

  openDialogAgregarReserva(){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(MakeReserveComponent, {data: { pathname },  panelClass: 'no-scroll' });
  }
}
