import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Booking } from '../interfaces/booking';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private myAppUrl: string = environment.endpoint.emails;
  private myApiUrl: string = 'api/Email/ConfirmarReserva';
  private myApiUrl2: string = 'api/Email/ConfirmarTicket';
  private myApiUrl3: string = 'api/Email/RespostaTicket';
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

  sendTicketConfirmationEmail(ticket: any): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl2}/${sessionStorage.getItem('userEmail')}`, ticket);
  }  

  sendTicketResponse(ticket: any): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl3}/${ticket.email}`, ticket);
  }  
}
