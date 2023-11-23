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
import { AgregarEditarOfficeComponent } from '../update-office/update-office.component';
import { FormControl } from '@angular/forms';
import fuzzysearch from "fuzzysearch-ts";

@Component({
  selector: 'app-read-office',
  templateUrl: './read-office.component.html',
  styleUrls: ['./read-office.component.css']
})
export class ListaOfficeComponent {
  mostrarElemento?: boolean;
  displayedColumns: string[] = ['officeId', 'nameOffice', 'cityName', 'Acciones'];
  dataSource = new MatTableDataSource<Office>();
  loading: boolean = false;
  cities: any[] = [];
  filteredOffice: any[] = [];
  nameOffice: string = '';
  officeControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private _officeService: OfficeService,
    private _cityService: CityService,
    private dialog: MatDialog
  ) {
    this.filteredOffice = this.dataSource.data.slice();
    this.officeControl = new FormControl();
    this.officeControl.valueChanges.subscribe(value => {
      this.filterOffices(value);
    });
  }

  ngOnInit(): void {
    const userRole = sessionStorage.getItem('userRole');
    if (userRole == 'Administrador') {
      this.mostrarElemento = true;
    }
    this.obtenerOffices();
    this.obtenerCities();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página';
    }
  }

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
      this.filteredOffice = this.dataSource.data.slice();
    });
  }

  obtenerCities(): void {
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

  openDialog(identification: number) {
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identification, pathname}});

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerOffices();
      this.obtenerCities();
    });
  }

  editarOffice(identification: number, office: Office) {
    const dialogRefPassword = this.dialog.open(AgregarEditarOfficeComponent, { data: { identification, office } });
  }

  agregarOffice() {
    const dialogRefPassword = this.dialog.open(AgregarEditarOfficeComponent, { data: {} });
  }

  mensajeExito() {
    this._snackBar.open('La oficina fue eliminada con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }

  filterOffices(value: string) {
    const valueLowerCase = value.trim().toLowerCase();

    this.filteredOffice = this.dataSource.data.filter(office =>
      fuzzysearch(valueLowerCase, office.nameOffice.toLowerCase())
    );
  }
}
