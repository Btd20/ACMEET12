import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from '../../../shared/interfaces/booking';
import { MeetingRoom } from '../../../shared/interfaces/meetingRoom';
import { BookingService } from '../../../shared/services/booking.service';
import { MeetingRoomService } from '../../../shared/services/meeting-room.service';
import { DateFilterFn } from '@angular/material/datepicker';


@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditarReservaComponent {
  horas: string[] = ["10:00", "10:15" , "10:30", "10:45", "11:00", "11:15", "11:45", 
  "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45",
   "15:00","15:15","15:30","15:45", "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", 
   "18:00","18:15","18:30","18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00","21:15","21:30","21:45", "22:00"];
  displayedColumns: string[] = ['reserveDate', 'startTime', 'endTime', 'Acciones'];
  dataSource = new MatTableDataSource<Booking>();
  loading: boolean = false;
  reservaId!: number;
  form!:FormGroup;

  meetingRoomId!:number;
  userId!: string;
  meetingRoomName!: string;

  disablePastDates: DateFilterFn<Date | null> = (date: Date | null) => {
    if (!date) {
      return false; // Si la fecha es null, no la deshabilitamos
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return date >= currentDate;
  };

  reserva: Booking = {
    reserveId: 0,
    meetingRoomName: '',
    reserveDate: '',
    startTime: '',
    endTime: '',
    meetingRoomId: 0,
    userId: ''
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista offices
  constructor(private _snackBar: MatSnackBar,
    private _bookingService: BookingService,
    private fb: FormBuilder,
    private _meetingRoomService: MeetingRoomService,
    private  dialogRef: MatDialogRef<EditarReservaComponent> ,
    @Inject(MAT_DIALOG_DATA) public reservaDatos:any) {
      this.form = this.fb.group({
        reserveDate: ['',Validators.required], // Asociar los valores de reserva a los campos del formulario
        startTime: ['',Validators.required], // Asociar los valores de reserva a los campos del formulario
        endTime: ['',Validators.required] // Asociar los valores de reserva a los campos del formulario
      });
      const reserva: Booking = this.reservaDatos as Booking;
      this.reservaId= reserva.reserveId;
     }

  ngOnInit(): void{
      this.obtenerBookingsById(this.reservaId);
  }

  obtenerBookingsById(reservaId: number ) {
    this.loading = true;
    this._bookingService.getBookingsById(reservaId).subscribe((data: Object) => {
      const reserva : Booking = data as Booking;
      this.meetingRoomId= reserva.meetingRoomId;
      this.userId=reserva.userId;

      this.obtenerMeetingRoomName(this.meetingRoomId);


      this.form.setValue({
        reserveDate: reserva.reserveDate,
        startTime: reserva.startTime,
        endTime: reserva.endTime

      })

      this.loading = false;
    });
  }

  obtenerMeetingRoomName(meetingRoomId: number){
    this._meetingRoomService.getRoom(meetingRoomId).subscribe((data:Object) =>{
      const meetingRoom : MeetingRoom = data as MeetingRoom;
      this.meetingRoomName = meetingRoom.meetingRoomName;
    })
  }
  editarReserva(reservaId:number, reserva: Booking) {
    this.loading = true;
    this._bookingService.updateBooking(reservaId, reserva).subscribe(data => {
      this.loading = false;
      // this.router.navigate(['/home/bookings']);
    })
  }

  modificarReserva(){
    if(this.reservaId !=0){
      // Fecha en formato de cadena
      const fechaString = this.form.value.reserveDate;

      // Crear un objeto de fecha a partir de la cadena
      const fecha = new Date(fechaString);

      // Obtener los componentes de fecha (año, mes, día)
      const year = fecha.getFullYear();
      const month = String(fecha.getMonth() + 1).padStart(2, "0"); // Sumamos 1 al mes porque en JavaScript los meses van de 0 a 11
      const day = String(fecha.getDate()).padStart(2, "0");

      // Construir la fecha en formato YYYY-MM-DD
      const fechaFormateada = `${year}-${month}-${day}`;


      this.reserva ={
        reserveDate: fechaFormateada,
        startTime: this.form.value.startTime,
        endTime: this.form.value.endTime,
        userId: this.userId,
        reserveId: this.reservaId,
        meetingRoomId: this.meetingRoomId
      }
      this.editarReserva(this.reservaId, this.reserva);
      this.mensajeExito("actualizada");
      setTimeout(function(){
        window.location.reload();
     }, 280);

    }

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  mensajeExito(texto: string) {
    this._snackBar.open(`La reserva fue ${texto} con éxito`, '', {
      duration: 2000,
      horizontalPosition: 'right'
    });
  }

}
