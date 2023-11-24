import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SafeUrl } from '@angular/platform-browser';
import { ImageService } from 'src/app/shared/services/ImageService ';

@Component({
  selector: 'app-help-see-ticket',
  templateUrl: './help-see-ticket.component.html',
  styleUrls: ['./help-see-ticket.component.css']
})
export class HelpSeeTicketComponent {

  default_url: string = "https://imgs.search.brave.com/GrTMprW4fg05XTsfzacsNofnbaMJuXlbLIXZqUAn9vg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw";
  profilepictureId: SafeUrl | undefined;
  ticket: any;

  constructor(private _snackBar: MatSnackBar,
              private imageService: ImageService,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<HelpSeeTicketComponent>) { this.ticket = data.ticket; }

  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.fetchAndUpdateProfilePicture(userId);
    }
  }

  cerrar() {
    this.dialogRef.close();
  }

  fetchAndUpdateProfilePicture(userId: string): void {
    this.imageService.getImage(userId!)
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

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
