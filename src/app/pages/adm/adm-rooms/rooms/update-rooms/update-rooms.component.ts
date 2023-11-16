import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingRoom } from '../../../../../shared/interfaces/meetingRoom';
import { MeetingRoomService } from '../../../../../shared/services/meeting-room.service';
import { Office } from 'src/app/shared/interfaces/office';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfficeService } from 'src/app/shared/services/office.service';

@Component({
  selector: 'app-agregar-editar-rooms',
  templateUrl: './update-rooms.component.html',
  styleUrls: ['./update-rooms.component.css']
})
export class AgregarEditarRoomsComponent {
  loading: boolean = false;
  form: FormGroup
  meetingRoomId: number;
  Operacion: string = 'Add';
  offices?: Office[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AgregarEditarRoomsComponent>,
    private _meetingRoomService: MeetingRoomService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _officeService: OfficeService,
    private aRoute: ActivatedRoute
    ) {

    this.meetingRoomId = data.identification;
    this.form = this.fb.group({
      meetingRoomName: ['', Validators.required], ////Campo requerido
      officeId: ['', Validators.required],
      capacity: ['', Validators.required]
    })

  }


  ngOnInit(): void {
    if (this.meetingRoomId != 0) {
      this.Operacion = 'Editar';
      this.obtenerRoom(this.meetingRoomId);
    }
    this._officeService.getOffices().subscribe(data => (this.offices = data));

  }

  obtenerRoom(meetingRoomId: number) {
    this.loading = true;
    this._meetingRoomService.getRoom(this.meetingRoomId).subscribe(data => {
      this.form.patchValue({
        meetingRoomName: data.meetingRoomName,
        officeId: data.officeId,
        capacity: data.capacity
      })
      this.loading = false;
    });
  }



  //Metodos
  agregarEditarRoom() {
    if (this.form.invalid) {
      // Formulario inválido, muestra una alerta al navegador
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    //Definir el objeto
    const meetingRoom: MeetingRoom = {
      meetingRoomName: this.form.value.meetingRoomName,
      officeId: this.form.value.officeId,
      meetingRoomId: 0,
      capacity: this.form.value.capacity,
    }
    if (this.meetingRoomId) {
      meetingRoom.meetingRoomId = this.meetingRoomId;
      this.editarRoom(this.meetingRoomId, meetingRoom);
      this.onNoClick();
    } else {
      this.agregarRoom(meetingRoom);
      this.onNoClick();
    }
    // if (this.meetingRoomId != 0) {
    //   meetingRoom.meetingRoomId = this.meetingRoomId;
    //   this.editarRoom(this.meetingRoomId, meetingRoom);
    // } else {
    //   this.agregarRoom(meetingRoom);
    // }
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
  onNoClick(): void {
    this.dialogRef.close();
  }

}
