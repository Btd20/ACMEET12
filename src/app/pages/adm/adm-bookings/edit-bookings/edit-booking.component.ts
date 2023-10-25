import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from '../../../../shared/interfaces/booking';
import { MeetingRoom } from '../../../../shared/interfaces/meetingRoom';
import { users } from '../../../../shared/interfaces/users';
import { BookingService } from '../../../../shared/services/booking.service';
import { MeetingRoomService } from '../../../../shared/services/meeting-room.service';
import { UsersService } from '../../../../shared/services/users.service';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditReservasComponent {
  mostrarElemento?:boolean;
  displayedColumns: string[] = ['reserveDate', 'startTime', 'endTime', 'Acciones'];
  dataSource = new MatTableDataSource<Booking>();
  loading: boolean = false;
  reservaId!: number;
  form!:FormGroup;

  reserva: Booking = {
    reserveId: 0,
    meetingRoomName: '',
    reserveDate: '',
    startTime: '',
    endTime: '',
    meetingRoomId: 0,
    userId: ''
  };

  meetingRoomId!:number;
  userId!: string;
  meetingRoomName!: string;
  userName! : string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar,
    private _bookingService: BookingService,
    private fb: FormBuilder,
    private _meetingRoomService: MeetingRoomService,
    private  dialogRef: MatDialogRef<EditReservasComponent> ,
    private _userService: UsersService,
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
   const userRole = sessionStorage.getItem('userRole');
  if(userRole=="Administrador"){
    this.mostrarElemento= true;
  }
}

obtenerBookingsById(reservaId: number ) {
    this.loading = true;
    this._bookingService.getBookingsById(reservaId).subscribe((data: Object) => {
      const reserva : Booking = data as Booking;
      this.meetingRoomId= reserva.meetingRoomId;
      this.userId=reserva.userId;

      this.obtenerMeetingRoomName(this.meetingRoomId);
      this.obtenerUserName(this.userId);

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
obtenerUserName(userId: string){
  this._userService.getUserById(userId).subscribe((data:Object) =>{
    const userRecuperado : users = data as users;
    this.userName = userRecuperado.userName;
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
     }, 380);

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
