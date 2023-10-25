import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingService } from '../../../../shared/services/booking.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { Booking } from '../../../../shared/interfaces/booking';
import { EditReservasComponent } from '../edit-bookings/edit-booking.component';
import { MatDialog } from '@angular/material/dialog';
<<<<<<< HEAD:src/app/pages/adm/adm-reservas/list-reservas/list-reservas.component.ts
import { PopRemoveQuestionComponent } from '../../../alerts/alert.component';
import { FormReserveComponent } from '../../../reserves/form-booking/form-booking.component';
=======
import { PopRemoveQuestionComponent } from '../../../pop-remove-question/pop-remove-question.component';
<<<<<<< HEAD
import { FormReserveComponent } from '../../../bookings/form-booking/form-reserve.component';
=======
import { FormReserveComponent } from '../../../bookings/form-booking/form-booking.component';
>>>>>>> f877470fe2cb36aaa176a456db2824af01cf8565:src/app/pages/adm/adm-bookings/read-bookings/read-booking.component.ts
>>>>>>> 08142f2be2bffa81864d91f544fda33d2c0e81d5

@Component({
  selector: 'app-read-booking',
  templateUrl: './read-booking.component.html',
  styleUrls: ['./read-booking.component.css']
})
export class ListReservasComponent {
  mostrarElemento?:boolean;
  displayedColumns: string[] = ['userName',
  'reserveId',
  'meetingRoomName',
  'reserveDate',
  'startTime',
   'endTime',
   'Acciones'];

   loading: boolean = false;
   dataSource = new MatTableDataSource<Booking>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _snackBar: MatSnackBar,
    private _bookingService: BookingService,
    private dialog: MatDialog) {

  }
  ngOnInit(): void {
    const userRole = sessionStorage.getItem('userRole');
    if(userRole=="Administrador"){
      this.mostrarElemento= true;
    }
      this.obtenerAllBookings();
  }

  openDialogEditar(element: any): void {
    const dialogRef = this.dialog.open(EditReservasComponent, {
      data: element
    });
  }

  openDialogAgregrarReserva(): void {
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(FormReserveComponent, {data: {pathname}});
  }

  obtenerAllBookings() {
    this.loading = true;
    this._bookingService.getAllBookings().pipe(
      map((data: any) => {
        // Mapear los datos para modificar el formato de la fecha
        const reservas = data.map((reserva: any) => {
          reserva.reserveDate = reserva.reserveDate.split('T')[0]; // Eliminar la parte "T00:00:00"
          return reserva;
        });
        return reservas;
      })
    ).subscribe((data: Booking[]) => {
      this.loading = false;
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página'
    }
  }

  //Filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(identification: number){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identification, pathname}});
  }

  mensajeExito() {
    this._snackBar.open('La reserva ha sido cancelada', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  } 
}
