import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeService } from '../../../../services/office.service';
import { Office } from 'src/app/interfaces/office';

@Component({
  selector: 'app-agregar-editar-office',
  templateUrl: './agregar-editar-office.component.html',
  styleUrls: ['./agregar-editar-office.component.css']
})
export class AgregarEditarOfficeComponent {
  loading: boolean = false;
  form: FormGroup
  Officeid: number;
  Operacion: string = 'Agregar';


  constructor(private _officeService: OfficeService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nameOffice: ['', Validators.required], ////Campo requerido
      cityId: ['', Validators.required]
    })

    this.Officeid = Number(this.aRoute.snapshot.paramMap.get('officeId'));
  }


  ngOnInit(): void {
    if (this.Officeid != 0) {
      this.Operacion = 'Editar';
      this.obtenerOffice(this.Officeid);
    }
  }

  obtenerOffice(Officeid: number) {
    this.loading = true;
    this._officeService.getOffice(Officeid).subscribe(data => {
      this.form.setValue({
        nameOffice: data.nameOffice,
        cityId: data.cityId
      })
      this.loading = false;
    });
  }



  //Metodos
  agregarEditarOffice() {
    //Definir el objeto
    const office: Office = {
      nameOffice: this.form.value.nameOffice,
      cityId: this.form.value.cityId
    }

    if (this.Officeid != 0) {
      office.officeId = this.Officeid;
      this.editaroffice(this.Officeid, office);
    } else {
      this.agregaroffice(office);
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
}
