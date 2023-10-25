import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../../../../../shared/interfaces/city';
import { CityService } from '../../../../../shared/services/city.service';
import { CountryService } from '../../../../../shared/services/country.service';
import { Country } from '../../../../../shared/interfaces/country';

@Component({
  selector: 'app-update-city',
  templateUrl: './update-city.component.html',
  styleUrls: ['./update-city.component.css']
})
export class AgregarEditarCityComponent {
  loading: boolean = false;
  form: FormGroup;
  cityId: number;
  Operacion: string = 'Add';
  countries?: Country[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AgregarEditarCityComponent>,
    private _cityService: CityService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _countryService: CountryService,
    private aRoute: ActivatedRoute
  ) {
    this.cityId = data.identification;
    this.form = this.fb.group({
      cityName: ['', Validators.required],
      countryId : ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.cityId !== 0) {
      this.Operacion = 'Editar';
      this.obtenerCity(this.cityId);
    }
    this._countryService.getCountries().subscribe(data => (this.countries = data));
  }

  obtenerCity(cityId: number) {
    this.loading = true;
    this._cityService.getCity(this.cityId).subscribe(data => {
      this.form.patchValue({
        cityName: data.cityName,
        countryId: data.countryId
      });
      this.loading = false;
    });
  }

  agregarEditarCity() {
    
    if (this.form.invalid) {
      // Formulario inválido, muestra una alerta al navegador
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const city: City = {
      cityName: this.form.value.cityName,
      countryId: this.form.value.countryId
        };



    if (this.cityId) {
      city.cityId = this.cityId;
      this.editarCity(this.cityId, city);
      this.onNoClick();
    } else {
      this.agregarCity(city);
      this.onNoClick();
    }
  }

  editarCity(cityId: number, city: City) {
    this.loading = true;
    this._cityService.updateCity(cityId, city).subscribe(data => {
      this.loading = false;
      this.mensajeExito('actualizada');
      this.router.navigate(['/home/admRooms/cities/listaCity']);
    });
  }

  agregarCity(city: City) {
    this._cityService.addCity(city).subscribe(data => {
      this.mensajeExito('registrada');
      this.router.navigate(['/home/admRooms/cities/listaCity']);
    });
  }

  mensajeExito(texto: string) {
    this._snackBar.open(`La ciudad fue ${texto} con éxito`, '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
