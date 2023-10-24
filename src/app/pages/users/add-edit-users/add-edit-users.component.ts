import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router'; // Importa el Router
import { RegisterService } from '../../../shared/services/register.service';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.css']
})
export class AddEditUsersComponent implements OnInit {
  userId: string="";
  formm: FormGroup;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _UsersService: UsersService,
    private router: Router,
     private route: ActivatedRoute,
     private  _registerService: RegisterService) {
    this.formm = this.fb.group({
      user: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public submitForm() {
    if (this.formm.invalid) {
      Object.values(this.formm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    const password = this.formm.value.password;
    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      // La contraseña no cumple con los requisitos
      // Muestra un mensaje de error al usuario
      this.snackBar.open('La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula y un número.', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      return; // No envía la solicitud si la contraseña no cumple con los requisitos
    }

    // Continúa con el registro si la contraseña cumple con los requisitos
    const userData = {
      userName: this.formm.value.user,
      email: this.formm.value.email,
      password: password
    };

    this._registerService.userRegister(userData)
      .subscribe(
        () => {
          // Registro exitoso
          this.router.navigate(['/home/users/listUser']); // Redirige a /listUser en caso de éxito
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            alert("Error 400. No se pudo completar la solicitud");
          } else {
            this.router.navigate(['/home/users/listUser']); // Redirige a /listUser en caso de error
          }
        }
      );
  }

  public get f(): any {
    return this.formm.controls;
  }

  error() {
    this.snackBar.open('La cuenta o contraseña son incorrectas', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
