import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { City } from '../../../../../shared/interfaces/city';
import { CityService } from '../../../../../shared/services/city.service';
import { CountryService } from '../../../../../shared/services/country.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopRemoveQuestionComponent } from '../../../../alerts/alert.component';
import { AgregarEditarCityComponent } from '../../../adm-rooms/cities/update-cities/update-city.component';
import { FormControl } from '@angular/forms';
import fuzzysearch from "fuzzysearch-ts";

@Component({
  selector: 'app-list-city',
  templateUrl: './read-city.component.html',
  styleUrls: ['./read-city.component.css']
})
export class ListCityComponent {
  mostrarElemento?:boolean;
  displayedColumns: string[] = ['cityId', 'cityName', 'countryName', 'Acciones'];
  dataSource = new MatTableDataSource<City>();
  loading: boolean = false;
  filteredCity: any[] = [];
  cities: any[]= [];
  countries: any[]= [];
  nameCity: string ='';
  citiesControl = new FormControl();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Pop up y lista offices
  constructor(
    private _snackBar: MatSnackBar, private _cityService: CityService, private _countryService: CountryService, private dialog: MatDialog) {
      
      this.filteredCity = this.cities.slice();
      this.citiesControl = new FormControl;
      this.citiesControl.valueChanges.subscribe(value => {
        this.filterCities(value);
      });
     }

  ngOnInit(): void {
    const userRole = sessionStorage.getItem('userRole');
    if(userRole=="Administrador"){
      this.mostrarElemento= true;
    }
    this.obtenerCity();
    this.obtenerCountry();
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
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
 
    // Filtrar el mat-autocomplete
    this.filteredCity = this.cities.filter(city =>
      city.cityName.toLowerCase().includes(filterValue)
    );
 
    // Aplicar el filtro al mat-table
    this.dataSource.filter = filterValue.trim();
 
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
   
    /*
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
 
   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    */
  }

  obtenerCity(): void  {
    this.loading = true;
    this._cityService.getAllCities().subscribe(data => {
      this.loading = false;
      this.dataSource.data = data;
      this.filteredCity = this.cities.slice();
    });
  }

  obtenerCountry(): void  {
    this.loading = true;
    this._countryService.getCountries().subscribe(data => {
      this.loading = false;
      this.countries = data;
    });
  }

  getCountryName(countryId: number): string {
    const country = this.countries.find(c => c.countryId === countryId);
    return country ? country.countryName : '';
  }
  
  

  openDialog(identification: number){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identification, pathname}});

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerCountry();
      this.obtenerCity();
  });
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
  filterCities(value: string) {
    const valueLowerCase = value.trim().toLowerCase();
 
    this.filteredCity = this.cities.filter(cities => {
      const nameCityLowerCase = cities.cityName.toLowerCase();
      const trimmedCityName = nameCityLowerCase.replace('city ', '').trim();
 
      return fuzzysearch(valueLowerCase, trimmedCityName);
    });
  }
}
