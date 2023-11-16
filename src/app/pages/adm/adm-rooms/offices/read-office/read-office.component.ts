import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Office } from '../../../../../shared/interfaces/office';
import { CityService } from '../../../../../shared/services/city.service';
import { OfficeService } from '../../../../../shared/services/office.service';
import { MatDialog } from '@angular/material/dialog';
import { PopRemoveQuestionComponent } from 'src/app/pages/alerts/alert.component';

@Component({
  selector: 'app-read-office',
  templateUrl: './read-office.component.html',
  styleUrls: ['./read-office.component.css']
})
export class ListaOfficeComponent {
  mostrarElemento?:boolean;
  displayedColumns: string[] = ['officeId', 'nameOffice', 'cityName', 'Acciones'];
  dataSource = new MatTableDataSource<Office>();
  loading: boolean = false;
  cities: any[]= [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista offices
  constructor(private _snackBar: MatSnackBar,
    private _officeService: OfficeService,
    private _cityService: CityService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    const userRole = sessionStorage.getItem('userRole');
    if(userRole=="Administrador"){
      this.mostrarElemento= true;
    }
    this.obtenerOffices();
    this.obtenerCities();
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

  obtenerOffices() {
    this.loading = true;
    this._officeService.getAllOffices().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
    });
  }

  obtenerCities(): void  {
    this.loading = true;
    this._cityService.getAllCities().subscribe(data => {
      this.loading = false;
      this.cities = data;
    });
  }

  getCityName(cityId: number): string {
    const city = this.cities.find(c => c.cityId === cityId);
    return city ? city.cityName : '';
  }

  openDialog(identification: number){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identification, pathname}});

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerOffices();
      this.obtenerCities();
    });
  }

  mensajeExito() {
    this._snackBar.open('La oficina fue eliminada con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}
