import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MeetingRoom } from '../../../shared/interfaces/meetingRoom';
import { MeetingRoomService } from '../../../shared/services/meeting-room.service';
import { OfficeService } from '../../../shared/services/office.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.css']
})
export class MeetingRoomComponent {
  displayedColumns: string[] = ['meetingRoomId', 'meetingRoomName', 'nameOffice', 'capacity'];
  dataSource = new MatTableDataSource<MeetingRoom>();
  loading: boolean = false;
  offices: any[]= [];
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista offices
  constructor(private _snackBar: MatSnackBar, private _meetingRoomService : MeetingRoomService, private _officeService: OfficeService, private dialog: MatDialog) { }

  ngOnInit(): void {
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
}
