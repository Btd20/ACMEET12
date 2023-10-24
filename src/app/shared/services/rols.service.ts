import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class RolsService {
  private myAppUrl: string = environment.endpoint.users;
  private myApiUrl: string =  'api/Auth/AddRol/';
  private myApiUrlV: string =  'api/Auth/verificationAdm';
  private headers?: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem("token");
    
    this.headers = new HttpHeaders({
           'Authorization': `Bearer `+token
    });
  }

  AddRoleToUser(userId: string, rol: string): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}?userId=${userId}&rol=${rol}`;
    return this.http.post<any>(url, {}, { headers: this.headers });
  }

  AdministratorVerification(userId: string): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrlV}?userId=${userId}`;
    return this.http.get<any>(url, { headers: this.headers });
  }
}
