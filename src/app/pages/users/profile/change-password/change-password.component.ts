import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from '../../../../shared/services/login.service';
import { ChangePassword } from '../../../../shared/interfaces/changePassword';
import { login } from '../../../../shared/interfaces/login';
import { changePasswordUser } from '../../../../shared/interfaces/changePasswordUser';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  form: FormGroup
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  loginUser?: login;
  NewPasswordUser?: ChangePassword;
 


  constructor(
    private elementRef: ElementRef,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: LoginService, // Inyecta el servicio de autenticación
    private router: Router ,// Inyecta el servicio de enrutamiento
    private _changePasswordService: LoginService
  ) {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required]
    });
  }
    
ngOnInit(){
  this.elementRef.nativeElement.disabled = !this.form.valid;

    this.form.valueChanges.subscribe(() => {
      this.elementRef.nativeElement.disabled = !this.form.valid;
    });
}
  onChangePassword() {
    // Aquí puedes agregar la lógica para cambiar la contraseña, por ejemplo, haciendo una solicitud HTTP a tu backend.
    // Asegúrate de validar las contraseñas antes de enviar la solicitud.
    
    let userName = sessionStorage.getItem("user");
     if(userName){
      this.loginUser = {
        userName: userName,
        email: "",
        password: this.form.value.oldPassword
      }
     }
     this.NewPasswordUser = {
      contraseñaActual: this.form.value.oldPassword,
      nuevaContraseña: this.form.value.newPassword,
      confirmarNuevaContraseña: this.form.value.repeatNewPassword
     }
     if(this.loginUser && this.NewPasswordUser && this.NewPasswordUser.confirmarNuevaContraseña == this.NewPasswordUser.nuevaContraseña){
      let updatePassword: changePasswordUser = {
        user: this.loginUser,
        changePassword: this.NewPasswordUser
       }
       this._changePasswordService.changePassword(updatePassword).subscribe(data => {
        this.mensajeErrorExito("Your password is already updated");
        this.onNoClick();
       }, error => {
        this.mensajeErrorExito("Current password is incorrect");
       });;
     }else{
      this.mensajeErrorExito("The passwords do not match.");
     }
    

  }

  mensajeErrorExito(texto: string) {
    this._snackBar.open(`${texto}`, '', {
      duration: 4000,
      verticalPosition: 'bottom'
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


