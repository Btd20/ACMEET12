import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MeetingRoom } from '../../../../../shared/interfaces/meetingRoom';
import { MeetingRoomService } from '../../../../../shared/services/meeting-room.service';
import { OfficeService } from '../../../../../shared/services/office.service';
import { MatDialog } from '@angular/material/dialog';
import { PopRemoveQuestionComponent } from 'src/app/pages/alerts/alert.component';
import { AgregarEditarRoomsComponent } from '../update-rooms/update-rooms.component';

@Component({
  selector: 'app-list-rooms',
  templateUrl: './read-rooms.component.html',
  styleUrls: ['./read-rooms.component.css']
})
export class ListRoomsComponent {
  mostrarElemento?:boolean;
  displayedColumns: string[] = ['meetingRoomId', 'meetingRoomName', 'nameOffice', 'capacity','Acciones'];
  dataSource = new MatTableDataSource<MeetingRoom>();
  loading: boolean = false;
  offices: any[]= [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista offices
  constructor(private _snackBar: MatSnackBar, private _meetingRoomService: MeetingRoomService, private _officeService: OfficeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    const userRole = sessionStorage.getItem('userRole');
    if(userRole=="Administrador"){
      this.mostrarElemento= true;
    }
    this.obtenerRoom();
    this.obtenerOffices();

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

  obtenerRoom() {
    this.loading = true;
    this._meetingRoomService.getAllMeetingRooms().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
    });
  }

  obtenerOffices(): void  {
    this.loading = true;
    this._officeService.getAllOffices().subscribe(data => {
      this.loading = false;
      this.offices = data;
    });
  }

  getOfficeName(officeId: number): string {
    const office = this.offices.find(o => o.officeId === officeId);
    return office ? office.nameOffice : '';
  }

  openDialog(identification: number){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identification, pathname}});

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerOffices();
      this.obtenerRoom();
  });
  }
  editarRoom(identification: number, room: MeetingRoom) {
    const dialogRefPassword = this.dialog.open(AgregarEditarRoomsComponent, { data: { identification, room } });
  }

  agregarRoom() {
    const dialogRefPassword = this.dialog.open(AgregarEditarRoomsComponent, { data: {} });
  }
  mensajeExito() {
    this._snackBar.open('La oficina fue eliminada con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}
