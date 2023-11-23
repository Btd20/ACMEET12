import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from '../../../../../shared/interfaces/country';
import { CountryService } from '../../../../../shared/services/country.service';
import { MatDialog } from '@angular/material/dialog';
import { PopRemoveQuestionComponent } from 'src/app/pages/alerts/alert.component';
import { AgregarEditarCountryComponent } from '../../countries/update-country/update-country.component';
import { AgregarCountryComponent } from '../../countries/add-country/add-country.component';

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

    dialogRef.afterClosed().subscribe(result => {
        this.obtenerCountries();
    });
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
