//Este archivo sirve para hacer conexión con la parte backend

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private myAppUrl: string = environment.endpoint.geolocalizaciones;
  private myApiUrl: string =  'api/Country/';
  private headers?: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem("token");
    
    this.headers = new HttpHeaders({
           'Authorization': `Bearer `+token
    });
  }

  //Obtener la lista de countries
  getCountries() : Observable<Country[]>{
    return this.http.get<Country[]>(this.myAppUrl + this.myApiUrl, { headers: this.headers });
  }

  //Obtener el country dada la id
  getCountry(countryId : number) : Observable<Country>{
    return this.http.get<Country>(this.myAppUrl + this.myApiUrl+countryId,{ headers: this.headers });
  }

  //Eliminar el pais (void porque no retornaremos nada)
  deleteCountry(countryId : number) : Observable<void>{
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl+countryId, { headers: this.headers });
  }

  //Añadir pais en la base de datos
  addCountry(country: Country) : Observable<Country>{
    return this.http.post<Country>(this.myAppUrl + this.myApiUrl, country, { headers: this.headers });
  }

  //Editar datos del pais
  updateCountry(countryId:number, country: Country): Observable<void>{
    return this.http.put<void>(this.myAppUrl + this.myApiUrl+countryId, country, { headers: this.headers });
  }
}
