import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { EditarProfileComponent } from '../editar-profile/editar-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangePProfilePictureComponent } from '../change-p-profile-picture/change.p.profile.picture.component';
import { ImageService } from 'src/app/services/ImageService ';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  profilepictureId: string | undefined;
  localUser: string="";
  default_url: string = "https://imgs.search.brave.com/GrTMprW4fg05XTsfzacsNofnbaMJuXlbLIXZqUAn9vg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw";
  constructor(
    private profileService: ProfileService,
    public dialog: MatDialog,
    private imageService: ImageService

    ) {}

    

  openDialog(): void {
    const dialogRef = this.dialog.open(EditarProfileComponent, {});
  }


  ngOnInit() {
    this.profilepictureId  = this.imageService.getImage();
    if(this.profilepictureId == undefined){
      this.profilepictureId == this.default_url;
    } 
       
    
    const nombreEmail = sessionStorage.getItem('user');
    if(nombreEmail != null){
      this.localUser = nombreEmail;
    }

    

    this.profileService.getUserProfile(this.localUser).subscribe(
      (profileData) => {
        // Aquí obtienes los detalles del perfil del usuario y los asignas a las propiedades user y email.
        this.user = profileData.userName;
        this.email = profileData.email;
        this.phone = profileData.phoneNumber;
        this.profilepictureId = profileData.profilepictureId;
      },
      (error) => {
      }
    );



    

  }



  changePassword(): void{
    const dialogRefPassword = this.dialog.open(ChangePasswordComponent, {});
  }

  changeProfilePicture(): void{
    const dialogRefPassword = this.dialog.open(ChangePProfilePictureComponent, {});
  }
}









