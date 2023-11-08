import { Component, ElementRef,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../../../../shared/services/ImageService ';

@Component({
  selector: 'app-change-p-profile-picture',
  templateUrl: 'change.p.profile.picture.component.html',
  styleUrls: ['change.p.profile.picture.component.css']
})
export class ChangePProfilePictureComponent implements OnInit {
  url: string ="";
  constructor(
    private imageService: ImageService,
    private elementRef: ElementRef,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ChangePProfilePictureComponent>,
    private snackBar: MatSnackBar) {}
    private userId = sessionStorage.getItem('userId');


    ngOnInit() {
      if (this.userId) {
        this.imageService.getImage(this.userId);
      } else {
        console.error('No es troba el teu ID.');
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onselectedFile(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement?.files?.[0];
    
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
    
        if (this.userId) {
          this.imageService.uploadImage(this.userId, formData).subscribe(
            (response) => {
              console.log('Imagen subida con éxito', response);
            },
            (error) => {
              console.error('Error al subir la imagen', error);
            }
          );
        } else {
          console.error('No se encontró el ID.');
        }
      }
    }
         
}
