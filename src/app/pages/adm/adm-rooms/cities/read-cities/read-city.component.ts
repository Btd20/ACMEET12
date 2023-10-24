import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { City } from '../../../../../shared/interfaces/city';
import { CityService } from '../../../../../shared/services/city.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopRemoveQuestionComponent } from '../../../../../pages/pop-remove-question/pop-remove-question.component';
import { AgregarEditarCityComponent } from '../agregar-editar-city/agregar-editar-city.component';
@Component({
  selector: 'app-list-city',
  templateUrl: './list-city.component.html',
  styleUrls: ['./list-city.component.css']
})
export class ListCityComponent {
  mostrarElemento?:boolean;
  displayedColumns: string[] = ['cityId', 'cityName', 'countryName', 'Acciones'];
  dataSource = new MatTableDataSource<City>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista offices
  constructor(
    private _snackBar: MatSnackBar, private _cityService: CityService, private dialog: MatDialog) { }

  ngOnInit(): void {
    const userRole = sessionStorage.getItem('userRole');
    if(userRole=="Administrador"){
      this.mostrarElemento= true;
    }
    this.obtenerCity();
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

  obtenerCity() {
    this.loading = true;
    this._cityService.getCitys().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
    });
  }

  openDialog(identification: number){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identification, pathname}});
  }

  editarCity(identification: number, city: City){
    const dialogRefPassword = this.dialog.open(AgregarEditarCityComponent, {data: {identification, city}});
  }

  agregarCity(){
    const dialogRefPassword = this.dialog.open(AgregarEditarCityComponent, {data: {}});
  }

  mensajeExito() {
    this._snackBar.open('La oficina fue eliminada con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}
