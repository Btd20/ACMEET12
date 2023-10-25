import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from '../../../../../shared/interfaces/country';
import { CountryService } from '../../../../../shared/services/country.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AgregarCountryComponent {
  //Variables
  loading: boolean = false;
  form: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AgregarCountryComponent>,
    private _countryService: CountryService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      countryName: ['', Validators.required]
    })
  }
  ngOnInit(): void {}

  //Metodos
  agregarCountry() {
    //Definir el objeto
    const country: Country = {
      countryName: this.form.value.countryName
    }

    //Enivar el objeto al backend
    this._countryService.addCountry(country).subscribe(data => {
      this.mensajeExito('registrado');
      this.dialogRef.close();
      setTimeout(function(){
        window.location.reload();
     }, 280);
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
