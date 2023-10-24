import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { profile } from '../../../../shared/interfaces/profile';
import { ProfileService } from '../../../../shared/services/profile.service';


@Component({
  selector: 'app-editar-profile',
  templateUrl: './editar-profile.component.html',
  styleUrls: ['./editar-profile.component.css']
})
export class EditarProfileComponent {
  user? : profile | undefined
  localUser : string = "";
  form: FormGroup
  idUser: string | undefined
  
  constructor(
    private dialogRef: MatDialogRef<EditarProfileComponent>, 
    private profileService: ProfileService,
    private fb: FormBuilder, 
    private _snackBar: MatSnackBar){

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    })
    }
  

  ngOnInit(){
    const nombreEmail = sessionStorage.getItem('user');
    if(nombreEmail != null){
      this.localUser = nombreEmail;
    }
    this.getUser(this.localUser);
    this.getDataUserForm();
    this.savePersonalData();
  }

  getDataUserForm(){
    this.profileService.getUserProfile(this.localUser).subscribe(
      (profileData) => {
       this.form.setValue({
        name: profileData.userName,
        email: profileData.email,
        phone: profileData.phoneNumber
       })
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  savePersonalData() {
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
  mensajeErrorExito(texto: string) {
    this._snackBar.open(`${texto}`, '', {
      duration: 4000,
      verticalPosition: 'bottom'
    });
  }
}
