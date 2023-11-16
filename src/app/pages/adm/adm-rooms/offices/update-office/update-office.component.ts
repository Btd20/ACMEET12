import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeService } from '../../../../../shared/services/office.service';
import { Office } from '../../../../../shared/interfaces/office';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { City } from 'src/app/shared/interfaces/city';
import { CityService } from 'src/app/shared/services/city.service';

@Component({
  selector: 'app-agregar-editar-office',
  templateUrl: './update-office.component.html',
  styleUrls: ['./update-office.component.css']
})
export class AgregarEditarOfficeComponent {
  loading: boolean = false;
  form: FormGroup;
  Officeid: number;
  Operacion: string = 'Add';
  cities?: City[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AgregarEditarOfficeComponent>,
    private _officeService: OfficeService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private _cityService: CityService,
    private aRoute: ActivatedRoute
    ) {
    this.Officeid = data.identification;
    this.form = this.fb.group({
      nameOffice: ['', Validators.required], ////Campo requerido
      cityId: ['', Validators.required]
    });

  }


  ngOnInit(): void {
    if (this.Officeid != 0) {
      this.Operacion = 'Editar';
      this.obtenerOffice(this.Officeid);
    }
    this._cityService.getCitys().subscribe(data => (this.cities = data));
  }

  obtenerOffice(Officeid: number) {
    this.loading = true;
    this._officeService.getOffice(Officeid).subscribe(data => {
      this.form.patchValue({
        nameOffice: data.nameOffice,
        cityId: data.cityId
      })
      this.loading = false;
    });
  }



  //Metodos
  agregarEditarOffice() {

    if (this.form.invalid) {
      // Formulario inválido, muestra una alerta al navegador
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    //Definir el objeto
    const office: Office = {
      nameOffice: this.form.value.nameOffice,
      cityId: this.form.value.cityId
    };

    if (this.Officeid) {
      office.officeId = this.Officeid;
      this.editaroffice(this.Officeid, office);
      this.onNoClick();
    } else {
      this.agregaroffice(office);
      this.onNoClick();
    }
  }

  editaroffice(Officeid: number, office: Office) {
    this.loading = true;
    this._officeService.updateOffice(Officeid, office).subscribe(data => {
      this.loading = false;
      this.mensajeExito('actualizada');
      this.router.navigate(['/home/admRooms/offices/listaOffices']);
    })
  }

  agregaroffice(office: Office) {
    //Enivar el objeto al backend
    this._officeService.addOffice(office).subscribe(data => {
      this.mensajeExito('registrado');
      this.router.navigate(['/home/admRooms/offices/listaOffices']);
    });
  }

  mensajeExito(texto: string) {
    this._snackBar.open(`El pais fue ${texto} con éxito`, '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
