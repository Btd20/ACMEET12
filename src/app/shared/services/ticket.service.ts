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
}
