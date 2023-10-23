import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingRoom } from '../../../../interfaces/meetingRoom';
import { MeetingRoomService } from '../../../../services/meeting-room.service';

@Component({
  selector: 'app-agregar-editar-rooms',
  templateUrl: './agregar-editar-rooms.component.html',
  styleUrls: ['./agregar-editar-rooms.component.css']
})
export class AgregarEditarRoomsComponent {
  loading: boolean = false;
  form: FormGroup
  meetingRoomId: number;
  Operacion: string = 'Add';
 

  constructor(private _meetingRoomService: MeetingRoomService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      meetingRoomName: ['', Validators.required], ////Campo requerido
      officeId: ['', Validators.required],
      capacity: ['', Validators.required]
    })

    this.meetingRoomId = Number(this.aRoute.snapshot.paramMap.get('meetingRoomId'));
  }


  ngOnInit(): void {
    if (this.meetingRoomId != 0) {
      this.Operacion = 'Editar';
      this.obtenerRoom(this.meetingRoomId);
    }


  }

  obtenerRoom(meetingRoomId: number) {
    this.loading = true;
    this._meetingRoomService.getRoom(this.meetingRoomId).subscribe(data => {
      this.form.setValue({
        meetingRoomName: data.meetingRoomName,
        officeId: data.officeId,
        capacity: data.capacity
      })
      this.loading = false;
    });
  }



  //Metodos
  agregarEditarRoom() {

    //Definir el objeto
    const meetingRoom: MeetingRoom = {
      meetingRoomName: this.form.value.meetingRoomName,
      officeId: this.form.value.officeId,
      meetingRoomId: 0,
      capacity: this.form.value.capacity,
    }

    if (this.meetingRoomId != 0) {
      meetingRoom.meetingRoomId = this.meetingRoomId;
      this.editarRoom(this.meetingRoomId, meetingRoom);
    } else {
      this.agregarRoom(meetingRoom);
    }
  }

  editarRoom(meetingRoomId: number, meetingRoom: MeetingRoom) {
    this.loading = true;
    this._meetingRoomService.updateRoom(meetingRoomId, meetingRoom).subscribe(data => {
      this.loading = false;
      this.mensajeExito('actualizada');
      this.router.navigate(['/home/admRooms/rooms/listaRoom']);
    })
  }

  agregarRoom(meetingRoom: MeetingRoom) {
    //Enivar el objeto al backend
    this._meetingRoomService.addRoom(meetingRoom).subscribe(data => {
      this.mensajeExito('registrado');
      this.router.navigate(['/home/admRooms/rooms/listaRoom']);
    });
  }

  mensajeExito(texto: string) {
    this._snackBar.open(`La Room fue ${texto} con éxito`, '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }

}
