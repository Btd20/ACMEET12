import { Component ,  Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from '../../shared/services/booking.service';
import { CityService } from '../../shared/services/city.service';
import { CountryService } from '../../shared/services/country.service';
import { MeetingRoomService } from '../../shared/services/meeting-room.service';
import { OfficeService } from '../../shared/services/office.service';
import { UsersService } from '../../shared/services/users.service';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class PopRemoveQuestionComponent {
  identification: number;
  identificationUser: string;
  pathName: string;
  booking?: boolean;
  countries?: boolean; 
  cities?: boolean; 
  offices?: boolean;
  rooms?: boolean;
  user?: boolean;
  reservation?: boolean;
  admHelp?: boolean;
  help?: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PopRemoveQuestionComponent>
    ,private _bookingService: BookingService
    ,private _ticketService: TicketService
    ,private _countryService: CountryService
    ,private _cityService: CityService
    ,private _officeService: OfficeService
    ,private _roomService: MeetingRoomService
    ,private _userService: UsersService
    ,private _reserveService: BookingService){
      this.identification = data.identification;
      this.identificationUser = data.identificationUser;
      this.pathName = data.pathname;
    }
  
  ngOnInit(){
    switch(this.pathName){
      case "/home/bookings":
        this.booking = true;
        break;
      case "/home/admRooms/countries/listaCountries":
        this.countries = true;
        break;
      case "/home/admRooms/cities/listaCity":
        this.cities = true;
        break;
      case "/home/admRooms/offices/listaOffices":
        this.offices = true;
        break;
      case "/home/admRooms/rooms/listaRoom":
        this.rooms = true;
        break;
      case "/home/users/listUser":
        this.user = true;
        break;
      case "/home/admReservas/listReservas":
        this.reservation = true;
        break;
      case "/home/help":
        this.help = true;
        break;
      case "/home/admHelp":
        this.admHelp = true;
        break;
    }  
  }


  //Funcion pop up de cancelar la reserva
 removeElement() {
  switch(this.pathName){
    case "/home/bookings":
      this._bookingService.cancelBooking(this.identification).subscribe(() => {
        this.mensajeExito();
        this.dialogRef.close();
      });
      break;
    case "/home/admRooms/countries/listaCountries":
        this._countryService.deleteCountry(this.identification).subscribe(() => {
          this.mensajeExito();
          this.dialogRef.close();
        });
      break;
    case "/home/admRooms/cities/listaCity":
        this._cityService.deleteCity(this.identification).subscribe(() => {
          this.mensajeExito();
          this.dialogRef.close();
        });
      break;
    case "/home/admRooms/offices/listaOffices":
        this._officeService.deleteOffice(this.identification).subscribe(() => {
          this.mensajeExito();
          this.dialogRef.close();
        });
      break;
    case "/home/admRooms/rooms/listaRoom":
        this._roomService.deleteRoom(this.identification).subscribe(() => {
          this.mensajeExito();
          this.dialogRef.close();
        });
      break;
    case "/home/users/listUser":
        this._userService.deleteuser(this.identificationUser).subscribe(() => {
          this.mensajeExito();
          this.dialogRef.close();
        });
      break;
    case "/home/admReservas/listReservas":
        this._reserveService.cancelBooking(this.identification).subscribe(() => {
          this.mensajeExito();
          this.dialogRef.close();
        });
      break;
      case "/home/help":
        this._ticketService.deleteTicket(this.identification).subscribe(() => {
          this.mensajeExito();
          this.dialogRef.close('');
        });
      break;
      case "/home/admHelp":
        this._ticketService.deleteTicket(this.identification).subscribe(() => {
          this.mensajeExito();
          this.dialogRef.close();
        });
      break;
  }  
}


onNoClick(): void {
  this.dialogRef.close();
}

mensajeExito() {
  switch(this.pathName){
    case "/home/bookings":
      this.popup("Your booking is already canceled");
      break;
    case "/home/admRooms/countries/listaCountries":
      this.popup("Your removed the country in the database");
      break;
    case "/home/admRooms/cities/listaCity":
      this.popup("Your removed the city in the database");
      break;
      case "/home/admRooms/offices/listaOffices":
      this.popup("Your removed the office");
      break;
    case "/home/admRooms/rooms/listaRoom":
      this.popup("Your removed the room in the database");
      break;
    case "/home/users/listUser":
      this.popup("Your removed the user in the database");
      break;
    case "/home/admReservas/listReservas":
      this.popup("Your removed the booking in the database");
      break;
  }  
 
}


popup(mensaje: string){
  this._snackBar.open(mensaje,'', {
    duration: 4000,
    horizontalPosition: 'right'
  });
}

refreshWindow(){
  this.onNoClick();
        setTimeout(function(){
          window.location.reload();
        }, 2000);
}
}
