import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { Booking } from '../../../shared/interfaces/booking';
import { BookingService } from '../../../shared/services/booking.service';
import { PopRemoveQuestionComponent } from '../../alerts/alert.component';
import { EditarReservaComponent } from '../edit-booking/edit-booking.component';
import { FormReserveComponent } from '../form-booking/form-booking.component';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';


@Component({
  selector: 'app-booking',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})export class BookingComponent {
  displayedColumns: string[] = ['reserveId', 'meetingRoomName', 'reserveDate', 'startTime', 'endTime', 'hours', 'Acciones'];
  dataSource = new MatTableDataSource<Booking>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista offices
  constructor(private _snackBar: MatSnackBar,
    private _bookingService: BookingService,
    private dialog: MatDialog) {

  }

 seleccionarEndTime(){
  alert("hola");
 }

  openDialogEditarReserva(element: any): void {
    const dialogRef = this.dialog.open(EditarReservaComponent, {
      data: element
    });
  }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if(userId){
      this.obtenerBookings(userId);
    }
  }
  //Paginaciones y ordenar
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
  
  obtenerBookings(userId: string) {
    // this.loading = true;
    this._bookingService.getBookings(userId).pipe(
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
      const jsonData = JSON.stringify(data);
      localStorage.setItem("bookings", jsonData);
    },error => {
      const jsonData= localStorage.getItem("bookings");
      let bookings = undefined;
      if(jsonData){
        bookings = JSON.parse(jsonData);
      }
     this.dataSource.data = bookings;
      
     
    });
  }

  openDialogEliminarReserva(identification: number) {
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identification, pathname}});

    dialogRef.afterClosed().subscribe(result => {
      const userId = sessionStorage.getItem('userId');
      if (userId != null) {
        this.obtenerBookings(userId)
      }
    });
  }  

  openDialogAgregarReserva(){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(FormReserveComponent, {data: { pathname },  panelClass: 'no-scroll' });
  }

  mensajeExito() {
    this._snackBar.open('La reserva ha sido cancelada', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}
