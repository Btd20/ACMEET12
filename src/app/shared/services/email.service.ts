import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Booking } from 'src/app/interfaces/booking';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private myAppUrl: string = environment.endpoint.emails;
  private myApiUrl: string = 'api/Email';
  private headers?: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem("token");
    
    this.headers = new HttpHeaders({
           'Authorization': `Bearer `+token
    });
  }

sendConfirmationEmail(email: string, reserva: Booking): Observable<any> {
  const data = { email, reserva };
  return this.http.post<any>(this.myAppUrl + this.myApiUrl, data);
}

}
