import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageUrl: string = '';
  private profilepictureId: string = '';

  setImage(url: string) {
    this.imageUrl = url;
  }

  getImage(): string {
    return this.imageUrl;
  }
}
