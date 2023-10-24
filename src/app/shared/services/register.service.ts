import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Register } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private myAppUrl: string = environment.endpoint.users;
  private myApiUrl: string =  'api/Auth/Register';
  private headers?: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem("token");
    
    this.headers = new HttpHeaders({
           'Authorization': `Bearer `+token
    });
  }

  userRegister(user : Register) : Observable<any>{
    return this.http.post<any>(this.myAppUrl + this.myApiUrl,user, { headers: this.headers });
  }
}
