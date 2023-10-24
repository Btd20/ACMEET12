import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../../../../../shared/interfaces/country';
import { CountryService } from '../../../../../shared/services/country.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-country',
  templateUrl: './update-country.component.html',
  styleUrls: ['./update-country.component.css']
})
export class AgregarEditarCountryComponent {
  //Variables
  loading: boolean = false;
  form: FormGroup
  countryId: number;
  Operacion: string = 'Agregar';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AgregarEditarCountryComponent>,
    private _countryService: CountryService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      countryName: ['', Validators.required] ////Campo requerido
    })

    this.countryId = data.identification;
    //Obtiene el countryId de la URL
    // this.countryId = Number(this.aRoute.snapshot.paramMap.get('countryId'));
  }

  //Cada vez que llama este componente los metodos o variables que tiene dentro se ejecuta
  ngOnInit(): void {
    if (this.countryId != 0) {
      this.Operacion = 'Editar';
      this.obtenerCountry(this.countryId);
    }
  }

  obtenerCountry(countryId: number) {
    this.loading = true;
    this._countryService.getCountry(countryId).subscribe(data => {
      this.form.setValue({
        countryName: data.countryName
      })

      this.loading = false;
    })
  }
  //Metodos
  agregarEditarCountry() {
    //Definir el objeto
    const country: Country = {
      countryName: this.form.value.countryName //Obtener el nombre del pais introducido
    }

    if (this.countryId != 0) {
      country.countryId = this.countryId;
      this.editarCountry(this.countryId, country);
    } else {
      this.agregarCountry(country);
    }
  }

  editarCountry(countryId: number, country: Country) {
    this.loading = true;
    this._countryService.updateCountry(countryId, country).subscribe(data => {
      this.loading = false;
      this.mensajeExito("actualizada");
      setTimeout(function(){
        window.location.reload();
     }, 280);
    })
  }

  agregarCountry(country: Country) {
    //Enivar el objeto al backend
    this._countryService.addCountry(country).subscribe(data => {
      this.mensajeExito('registrado');
      this.router.navigate(['/home/admRooms/countries/listaCountries']);
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  mensajeExito(texto: string) {
    this._snackBar.open(`El pais fue ${texto} con éxito`, '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
}
