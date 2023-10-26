import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Booking } from 'src/app/shared/interfaces/booking';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private myAppUrl: string = environment.endpoint.emails;
  private myApiUrl: string = 'api/Email/ConfirmarReserva';
  private headers?: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem("token");
    
    this.headers = new HttpHeaders({
           'Authorization': `Bearer `+token
    });
  }

  sendConfirmationEmail(reserva: Booking): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}/${sessionStorage.getItem('userEmail')}`, reserva);
  }  
}
