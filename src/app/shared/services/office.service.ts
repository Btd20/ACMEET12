import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Office } from '../interfaces/office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  private myAppUrl: string = environment.endpoint.geolocalizaciones;
  private myApiUrl: string = 'api/Office/';
  private headers?: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem("token");
    
    this.headers = new HttpHeaders({
           'Authorization': `Bearer `+token
    });
  }

  //Obtener la lista de Offices
  getOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(this.myAppUrl + this.myApiUrl+"OfficesWithCity", { headers: this.headers });
  }

  //Obtener la officina dada la id
  getOffice(Officeid: number): Observable<Office> {
    return this.http.get<Office>(this.myAppUrl + this.myApiUrl + Officeid, { headers: this.headers });
  }

  getAllOffices(): Observable<Office[]> {
    return this.http.get<Office[]>(this.myAppUrl + this.myApiUrl, { headers: this.headers });
  }  

  getOfficesByCityId(cityId: number): Observable<Office[]>{
    return this.http.get<Office[]>(this.myAppUrl + this.myApiUrl + "city/"+ cityId, { headers: this.headers });
  }
  //Eliminar la oficina (void porque no retornaremos nada)
  deleteOffice(Officeid: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + Officeid, { headers: this.headers });
  }

  //Añadir oficinas en la base de datos
  addOffice(office: Office): Observable<Office> {
    return this.http.post<Office>(this.myAppUrl + this.myApiUrl, office, { headers: this.headers });
  }

  //Editar datos del pais
  updateOffice(Officeid: number, office: Office): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + Officeid, office, { headers: this.headers });
  }


}
