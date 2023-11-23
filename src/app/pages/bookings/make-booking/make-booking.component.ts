import { MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MeetingRoomService } from '../../../shared/services/meeting-room.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { Country } from '../../../shared/interfaces/country';
import { City } from '../../../shared/interfaces/city';
import { Office } from '../../../shared/interfaces/office';
import { CountryService } from '../../../shared/services/country.service';
import { CityService } from '../../../shared/services/city.service';
import { OfficeService } from '../../../shared/services/office.service';
import { MeetingRoom } from '../../../shared/interfaces/meetingRoom';
import { EmailService } from 'src/app/shared/services/email.service';
import { Booking } from '../../../shared/interfaces/booking';
import { ProfileService } from '../../../shared/services/profile.service';
import { BookingService } from '../../../shared/services/booking.service';
import { profile } from '../../../shared/interfaces/profile';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateFilterFn } from '@angular/material/datepicker';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-make-booking',
  templateUrl: './make-booking.component.html',
  styleUrls: ['./make-booking.component.css']
})
export class MakeReserveComponent {
  horasSeleccionada?: string;
  startTimeSeleccionada?: string;
  user?: string;
  bookingUser : Booking = {} as Booking;
  countries : Country[] = [];
  countrySelected: Country = {} as Country;
  cities  : City[] = [];
  citySelected: City = {} as City;
  offices : Office[] = [];
  officeSelected : Office = {} as Office;
  meetingRooms : MeetingRoom[] = [];
  meetingRoomSelected : MeetingRoom = {} as MeetingRoom;
  horaRoom: string[] = ["1h", "2h", "3h", "4h"];
    horas: string[] = ["10:00", "10:15" , "10:30", "10:45", "11:00", "11:15","11:30", "11:45", 
    "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45",
    "15:00","15:15","15:30","15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", 
    "18:00","18:15","18:30","18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00",
    "21:15","21:30","21:45", "22:00"];

  listUsers!: string[];
  userSelected!: string;
  userRole: string | any;
  mostrarElemento?: boolean;
  pathName?: string;

  reserveId: number | any;
  ReserveString?:string;
  ReserveDate = new Date();
  form: FormGroup
  disablePastDates: DateFilterFn<Date | null> = (dateHide: Date | null) => {
    if (!dateHide) {
      return false; // Si la fecha es null, no la deshabilitamos
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return dateHide >= currentDate;
  };
  //Form Control
  countryFormControl = new FormControl();
  cityFormControl = new FormControl();
  officeFormControl = new FormControl();
  meetingRoomFormControl = new FormControl();
  userFormControl = new FormControl();


  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<MakeReserveComponent>,

    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _bookingService: BookingService,
    private _userService: ProfileService,
    private _meetingRoomService: MeetingRoomService,
    private _countryService: CountryService,
    private _cityService : CityService,
    private _officeService: OfficeService,
    private _emailService: EmailService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar){
    this.form = this.fb.group({
      meetingRoom : ['', Validators.required],
      ReserveDate : ['',Validators.required],
      hours: ['', Validators.required],
      endHour : ['', Validators.required],
      startHour : ['', Validators.required]
    });

    this.countryFormControl.valueChanges.subscribe(selectedCountry => {
      this.countrySelected = selectedCountry;
      const countryId = this.countrySelected.countryId;
      if(countryId){
        this.ObtenerCities(countryId);
      }
    });

    this.cityFormControl.valueChanges.subscribe(selectedCity => {
      this.citySelected = selectedCity;
      const cityId = this.citySelected.cityId;
      if(cityId){
        this.ObtenerOffices(cityId);
      } });

      this.officeFormControl.valueChanges.subscribe(selectedOffice => {
        this.officeSelected = selectedOffice;
        const officeId = this.officeSelected.officeId;
        if(officeId){
          this.ObtenerMeetingRooms(officeId);
        }
      });

      this.meetingRoomFormControl.valueChanges.subscribe(selectedMeetingRoom =>{
        this.meetingRoomSelected = selectedMeetingRoom;
      });

      this.userFormControl.valueChanges.subscribe(selectedUser => {
        this.userSelected = selectedUser;
        if(this.userSelected != null){
          this.ObtenerUsuario(this.userSelected);
        }
      });
      this.pathName = this.data.pathname;
  }

  seleccionarEndTime(){
    this.ReserveString = this.form.value.ReserveDate;
    let horasSeleccionada = this.form.value.hours;
    let startTimeSeleccionada = this.form.value.startHour;
    let positionHora = this.horas.indexOf(startTimeSeleccionada);
    this.horasSeleccionada = horasSeleccionada;
    this.startTimeSeleccionada = startTimeSeleccionada;
    switch(horasSeleccionada){
      case "1h":
        this.form = new FormGroup({
          endHour: new FormControl(this.horas[positionHora + 4])
        });
        break;
      case "2h":
        this.form = new FormGroup({
          endHour: new FormControl(this.horas[positionHora + 8])
        });
        break;
      case "3h":
        this.form = new FormGroup({
          endHour: new FormControl(this.horas[positionHora + 12])
        });
        break;
      case "4h":
        this.form = new FormGroup({
          endHour: new FormControl(this.horas[positionHora + 16])
        });
        break;
    }
  }
  
  ngOnInit(){
    this.ObtenerCountries();
    const userName = sessionStorage.getItem('user');
    this.userRole = sessionStorage.getItem('userRole');
    if(userName){
      this.ObtenerUsuario(userName);
    }
    if(this.userRole == 'Administrador'){
      this.mostrarElemento= true;
      this.ObtenerAllUsers();
    }

    switch(this.pathName){
      case "/home/bookings":
         this.mostrarElemento = false; 
        break;
      case "/home/admReservas/listReservas":
          this.mostrarElemento = true;
        break;
    }

  //    // Check if 'reserveId' has a value (assuming you set it when editing the reservation)
   }

  reservarSala(){
    const date = dayjs(this.ReserveString).format('YYYY-MM-DD');

    this.bookingUser.meetingRoomId = this.meetingRoomSelected.meetingRoomId;
    this.bookingUser.meetingRoomName = this.meetingRoomSelected.meetingRoomName;
    this.bookingUser.reserveDate = date;
    if(this.startTimeSeleccionada){
      this.bookingUser.startTime = this.startTimeSeleccionada;
    }
    this.bookingUser.endTime = this.form.value.endHour;
    if(this.user){
      this.bookingUser.userId = this.user;
    }
    this.bookingUser.hours = this.horasSeleccionada;
  
    this.hacerReserva(this.bookingUser);
    this.mensajeErrorExito("Se ha reservado con éxito");
  }

  ObtenerCountries(){
    this._countryService.getCountries().subscribe( dataCountries => {
      this.countries = dataCountries;
    })
  }

  ObtenerCities(idCountry:number){
      this._cityService.getCitiesByCountryId(idCountry).subscribe(dataCities =>{
        this.cities = dataCities;
    });
  }

  ObtenerOffices(cityId: number){
    this._officeService.getOfficesByCityId(cityId).subscribe(dataOffices => {
      this.offices = dataOffices;
    });
  }

  ObtenerMeetingRooms(officeId: number){
    this._meetingRoomService.getRoomByOfficeId(officeId).subscribe(dataRooms => {
      this.meetingRooms = dataRooms;
    });
  }

  ObtenerUsuario(userName: string){
    this._userService.getUserProfile(userName).subscribe(dataUser => {
      this.user = dataUser.id;
    });
  }

  hacerReserva(reserva: Booking){
    const userEmail = sessionStorage.getItem('userEmail');
    
    if (userEmail !== null) {
      this._bookingService.createBooking(reserva).subscribe(
        success => {
          this._emailService.sendConfirmationEmail(reserva).subscribe(
            response => {
              if (this.pathName == "/home/admReservas/listReservas") {
                window.location.href = "/home/admReservas/listReservas";
              } else {
                window.location.href = "/home/bookings";
                this.mensajeErrorExito("Se ha reservado con éxito");
              }
            },
            error => {
              console.error('Error al enviar el correo', error);
            }
          );
        },
        error => {
          this.mensajeErrorExito(error.error);
        }
      );
    } else {
      console.error('El userEmail es null');
    }
  }
  

  
  ObtenerAllUsers() {
    this._userService.getAllUsers().subscribe(
      (data: profile[]) => {
        const listUsers = data;  
        this.listUsers = listUsers.map( valor => valor.userName);
      },
      (error) => {
      }
    );
  }

  mensajeErrorExito(texto: string) {
    this._snackBar.open(`${texto}`, '', {
      duration: 700,
      verticalPosition: 'bottom'
    });
  
    // Espera un breve momento y luego cierra el diálogo
    setTimeout(() => {
      this.dialogRef.close();
    }, 1300); // Ajusta el tiempo según sea necesario
  }
}



