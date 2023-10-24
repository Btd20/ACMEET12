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


    ngOnInit() {
    this.url= this.imageService.getImage();
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onselectedFile(e: any) {
      if (e.target.files) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (event: any) => {
          this.url = event.target.result;
          this.imageService.setImage(this.url); // Guarda la URL en el servicio
        }
      }
    }
    
}
