import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environments';
import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private myAppUrl: string = environment.endpoint.geolocalizaciones;
  private myApiUrl: string = 'api/City/';
  private headers?: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem("token");
    
    this.headers = new HttpHeaders({
           'Authorization': `Bearer `+token
    });
  }

  //Obtener la lista de Offices
  getCitys(): Observable<City[]> {
    return this.http.get<City[]>(this.myAppUrl + this.myApiUrl+"CitiesWithCountries", { headers: this.headers });
  }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.myAppUrl + this.myApiUrl, { headers: this.headers });
  }  

  //Obtener la officina dada la id
  getCity(Cityid: number): Observable<City> {
    return this.http.get<City>(this.myAppUrl + this.myApiUrl + Cityid, { headers: this.headers });
  }

  getCitiesByCountryId(CountryId: number): Observable<City[]>{
    return this.http.get<City[]>(this.myAppUrl + this.myApiUrl+ "Country/"+CountryId, { headers: this.headers });
  }

  //Eliminar la oficina (void porque no retornaremos nada)
  deleteCity(Cityid: number): Observable<void> {
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + Cityid, { headers: this.headers });
  }

  //Añadir oficinas en la base de datos
  addCity(City: City): Observable<City> {
    return this.http.post<City>(this.myAppUrl + this.myApiUrl, City, { headers: this.headers });
  }

  //Editar datos del pais
  updateCity(Cityid: number, City: City): Observable<void> {
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + Cityid, City, { headers: this.headers });
  }


}
