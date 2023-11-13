import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from '../../../../shared/services/profile.service';
import { EditarProfileComponent } from '../editar-profile/editar-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangePProfilePictureComponent } from '../change-profile-picture/change.p.profile.picture.component';
import { ImageService } from '../../../../shared/services/ImageService ';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  profilepictureId: SafeUrl | undefined;
  localUser: string="";
  fileToUpload: File | null = null;
  userId: string | null = sessionStorage.getItem('userId');
  default_url: string = "https://imgs.search.brave.com/GrTMprW4fg05XTsfzacsNofnbaMJuXlbLIXZqUAn9vg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw";
  constructor(
    private profileService: ProfileService,
    public dialog: MatDialog,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditarProfileComponent, {});
  }

  ngOnInit(): void {
    this.fetchAndUpdateProfilePicture();

    const nombreEmail = sessionStorage.getItem('user');
    if(nombreEmail != null){
      this.localUser = nombreEmail;
    }

    this.profileService.getUserProfile(this.localUser).subscribe(
      (profileData) => {
        this.user = profileData.userName;
        this.email = profileData.email;
        this.phone = profileData.phoneNumber;
        //this.profilepictureId = profileData.profilepictureId;
      },
      (error) => {
        console.error('Error al obtener el perfil', error);
      }
    );
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  changePassword(): void{
    const dialogRefPassword = this.dialog.open(ChangePasswordComponent, {});
  }

  changeProfilePicture(): void {
    const dialogRefPassword = this.dialog.open(ChangePProfilePictureComponent, {});
    
    dialogRefPassword.afterClosed().subscribe((result) => {
      if (result) {
        if (!this.fileToUpload) {
          alert("Selecciona una imagen antes de subirla.");
          return;
        }
  
        const formData = new FormData();
        formData.append("file", this.fileToUpload);
  
        this.imageService.uploadImage(this.userId!, formData)
          .subscribe(
            () => {
              console.log('Imagen subida con éxito');
              this.fileToUpload = null;
              this.cdr.detectChanges();
              this.fetchAndUpdateProfilePicture();
            },
            (error) => {
              console.error('Error al subir la imagen', error);
              alert("Error al subir la imagen.");
            }
          );
      }
      this.fetchAndUpdateProfilePicture();
    });
  }  

  fetchAndUpdateProfilePicture(): void {
    this.imageService.getImage(this.userId!)
      .subscribe(
        (imageData: ArrayBuffer) => {
          console.log('Imagen obtenida correctamente');
          const base64String = this.arrayBufferToBase64(imageData);
          this.profilepictureId = 'data:image/jpeg;base64,' + base64String;
        },
        (error) => {
          console.error('Error al obtener la imagen', error);
          this.profilepictureId = this.default_url;
        }
      );
  }  
}
