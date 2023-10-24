
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { profile } from '../../../shared/interfaces/profile';
import { ProfileService } from '../../../shared/services/profile.service';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent {
  user? : profile | undefined
  idUsuario: string | undefined
  form : FormGroup
  constructor(private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,public dialogRef: MatDialogRef<EditarUsuariosComponent>, private profileService: ProfileService){
    this.idUsuario = data.idUsuario;
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    }) 
  }

 ngOnInit(){
  this.getDataUserForm();
  if(this.idUsuario){
    this.getUser(this.idUsuario);
  }
  this.saveUserData();
 }

 getDataUserForm(){
  if(this.idUsuario){
    this.profileService.getUserProfile(this.idUsuario).subscribe(
      (profileData) => {
       this.form.setValue({
        name: profileData.userName,
        email: profileData.email,
        phone: profileData.phoneNumber
       })
      }
    );
  }
}

saveUserData() {
  let user : profile
  if(this.user){
    user= this.user;

    user.userName = this.form.value.name;
    user.normalizedUserName = this.form.value.name;
    user.email = this.form.value.email;
    user.phoneNumber = this.form.value.phone;
    if(user.id){
      this.profileService.editUserProfile(user.id,user).subscribe(() => {
        sessionStorage.setItem('user', user.userName);
        this.dialogRef.close();
        this.mensajeErrorExito("Your data already updated");
        setTimeout(function(){
          window.location.reload();
       }, 2000);

      }, (error) =>{
        if (error.status == 409){
         this.mensajeErrorExito(error.error);
        }
      });
    }
  }
}

getUser(nameUser: string){
  this.profileService.getUserProfile(nameUser).subscribe((data) => {
    this.user = data
  });
}

 onNoClick(): void {
  this.dialogRef.close();
}

mensajeErrorExito(texto: string) {
  this._snackBar.open(`${texto}`, '', {
    duration: 4000,
    verticalPosition: 'bottom'
  });
}

}
