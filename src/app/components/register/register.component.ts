import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from '../../shared/interfaces/register';
import { tokenUser } from '../../shared/interfaces/token';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterService } from '../../shared/services/register.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  eslogan: string = "Booking has never been easier";
  formm: FormGroup;
  token: tokenUser | undefined;
  
  constructor(private fb: 
    FormBuilder, 
    private router: Router, 
    private snackBar: MatSnackBar, 
    private _registerService: RegisterService) {
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
    const register: Register = {
      userName: this.formm.value.user,
      email: this.formm.value.email,
      password: password
    };

    this._registerService.userRegister(register)
      .subscribe(
        () => {
          // Registro exitoso
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            // Aquí puedes verificar el mensaje de error específico
          alert("Error 400. No se pudo completar la solicitud");
          }else {
            window.location.href = '/login';  
          }
        }
       
      );
  }

  public get f(): any {
    return this.formm.controls;
  }

  error() {
    this.snackBar.open('The account or password is wrong', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
