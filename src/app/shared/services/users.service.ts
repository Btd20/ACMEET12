import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environments';
import { users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private myAppUrl: string = environment.endpoint.users;
  private myApiUrl: string = 'api/Users/';
  private headers?: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem("token");
    
    this.headers = new HttpHeaders({
           'Authorization': `Bearer `+token
    });
  }



    //Obtener la lista de Users
  getusers(): Observable<users[]> {
    return this.http.get<users[]>(this.myAppUrl + this.myApiUrl, { headers: this.headers });
  }

  //Obtener el ususario dado el nombre
  getuser(userName: string): Observable<users> {
    return this.http.get<users>(this.myAppUrl + this.myApiUrl + userName, { headers: this.headers });
  }


  //Eliminar el ususario (void porque no retornaremos nada)
  deleteuser(userName : string): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + userName, { headers: this.headers });
  }

  //Añadir ususario en la base de datos
  adduser(User: users): Observable<any> {
    return this.http.post<any>(this.myAppUrl + this.myApiUrl, User, { headers: this.headers });
  }

  //Editar datos del u suario
  updateuser(userName: string, users: users): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + userName, users, { headers: this.headers });
  }

  getUserById(userId: string) {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${userId}`, { headers: this.headers });
  }
}





