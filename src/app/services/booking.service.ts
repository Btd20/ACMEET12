import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Country } from '../interfaces/country';
import { Booking } from '../interfaces/booking';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private myAppUrl: string = environment.endpoint.reservas;
  private myApiUrl: string = 'api/Reserve';
  private headers?: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem("token");
    
    this.headers = new HttpHeaders({
           'Authorization': `Bearer `+token
    });
  }

  getBookings(userId: string){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/ReserveByUserId/${userId}`, { headers: this.headers });
  }

  cancelBooking(reserveId:number){
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${reserveId}`, { headers: this.headers });
  }

  createBooking(reserve:Booking){
    return this.http.post(this.myAppUrl + this.myApiUrl, reserve, { headers: this.headers });
  }

  updateBooking(reserveId:number, reserve:Booking){
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${reserveId}`, reserve, { headers: this.headers });
  }
  getBookingsById(reserveId:number){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${reserveId}`, { headers: this.headers });
  }
  getAllBookings(){
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/ReserveRoomUser`, { headers: this.headers });
  }

}
