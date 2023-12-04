import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private myAppUrl: string = environment.endpoint.tickets;
  private myApiUrl: string = 'api/tickets';
  constructor(private http: HttpClient) {}

  getTickets(): Observable<any[]> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    return this.http.get<any[]>(url);
  }

  deleteTicket(ticketId: number): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${ticketId}`;
    return this.http.delete<any>(url);
  }

  updateTicket(ticketId: number, updatedTicket: any): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${ticketId}`;
    return this.http.put<any>(url, updatedTicket);
  }  

  createTicket(newTicket: any): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}`;
    return this.http.post<any>(url, newTicket);
  }

  getTicketsByUserId(userId: string): Observable<any[]> {
    const url = `${this.myAppUrl}${this.myApiUrl}/${userId}`;
    return this.http.get<any[]>(url);
  }
}
