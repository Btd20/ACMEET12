import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl: string = 'https://localhost:7148/api/images';

  constructor(private http: HttpClient) {}

  uploadImage(id: string, formData: FormData) {
    return this.http.post(`${this.apiUrl}/${id}`, formData);
  }   

  getImage(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`, { responseType: 'arraybuffer' });
  }
}
