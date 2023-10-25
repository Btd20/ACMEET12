import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from '../../../../../shared/interfaces/country';
import { CountryService } from '../../../../../shared/services/country.service';
import { MatDialog } from '@angular/material/dialog';
<<<<<<< HEAD:src/app/pages/adm/adm-rooms/countries/lista-country/lista-country.component.ts
import { PopRemoveQuestionComponent } from 'src/app/pages/alerts/alert.component';
import { AgregarEditarCountryComponent } from '../agregar-editar-country/agregar-editar-country.component';
import { AgregarCountryComponent } from '../agregar-country/agregar-country.component';
=======
import { PopRemoveQuestionComponent } from 'src/app/pages/pop-remove-question/pop-remove-question.component';
import { AgregarEditarCountryComponent } from '../update-country/update-country.component';
import { AgregarCountryComponent } from '../add-country/add-country.component';
>>>>>>> f877470fe2cb36aaa176a456db2824af01cf8565:src/app/pages/adm/adm-rooms/countries/read-country/read-country.component.ts

@Component({
  selector: 'app-read-country',
  templateUrl: './read-country.component.html',
  styleUrls: ['./read-country.component.css']
})
export class ListaCountryComponent {
  displayedColumns: string[] = ['countryId', 'countryName', 'Acciones'];
  dataSource = new MatTableDataSource<Country>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista countries
  constructor(private _snackBar: MatSnackBar,
    private _countryService: CountryService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerCountries();
  }
  
  //Paginaciones y ordenar
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por página'
    }
  }

  //Filtro Angular material
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  obtenerCountries() {
    this.loading = true;
    this._countryService.getCountries().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
    });
  }


  openDialog(identification: number){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identification, pathname}});
  }

  editarCountry(identification: number, country: Country){
    const dialogRef = this.dialog.open(AgregarEditarCountryComponent, {data: {identification, country}});
  }

  agregarCountry() {
    const dialogRef = this.dialog.open(AgregarCountryComponent);
  }


  mensajeExito() {
    this._snackBar.open('El pais fue eliminada con éxito', '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}
