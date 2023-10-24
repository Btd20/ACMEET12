import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private myAppUrl: string = environment.endpoint.users;
  private myApiUrl: string = 'api/Users/'; // Ajusta esto según tu API
  private headers?: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem("token");
    
    this.headers = new HttpHeaders({
           'Authorization': `Bearer `+token
    });
  }

  getUserProfile(user: string): Observable<profile> {
    // Aquí realizar la solicitud HTTP para obtener los detalles del perfil del usuario.
    // Asumiendo que la respuesta contiene un objeto con campos "user" y "email".
    return this.http.get<profile>(this.myAppUrl + this.myApiUrl+user, { headers: this.headers });
  }

  editUserProfile(user: string, profile: profile): Observable <void>{
    return this.http.put<void>(this.myAppUrl+this.myApiUrl+user, profile, { headers: this.headers });
  }

  getAllUsers(): Observable<profile[]> { // Especifica el tipo 'profile[]' en la respuesta Observable
    return this.http.get<profile[]>(this.myAppUrl + this.myApiUrl, { headers: this.headers });
  }

}

