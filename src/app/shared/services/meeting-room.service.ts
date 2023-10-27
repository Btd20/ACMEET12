import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { MeetingRoom } from '../interfaces/meetingRoom';

@Injectable({
  providedIn: 'root'
})
export class MeetingRoomService {
  private myAppUrl: string = environment.endpoint.geolocalizaciones;
  private myApiUrl: string =  'api/MeetingRoom/';
  private headers?: HttpHeaders;

  constructor(private http: HttpClient) {
    let token = sessionStorage.getItem("token");
    
    this.headers = new HttpHeaders({
           'Authorization': `Bearer `+token
    });
  }

  getMeetingRooms(): Observable <MeetingRoom[]>{
      return this.http.get<MeetingRoom[]>(this.myAppUrl+this.myApiUrl+"RoomsWithOffices", { headers: this.headers });
  }

  getAllMeetingRooms(): Observable <MeetingRoom[]>{
    return this.http.get<MeetingRoom[]>(this.myAppUrl+this.myApiUrl, { headers: this.headers });
}
      //Obtener la officina dada la id
      getRoom(meetingRoomId: number): Observable<MeetingRoom> {
        return this.http.get<MeetingRoom>(this.myAppUrl + this.myApiUrl + meetingRoomId, { headers: this.headers });
      }

      getRoomByOfficeId(officeId: number): Observable<MeetingRoom[]>{
        return this.http.get<MeetingRoom[]>(this.myAppUrl+this.myApiUrl+"office/"+ officeId, { headers: this.headers });
      }

      //Eliminar la oficina (void porque no retornaremos nada)
      deleteRoom(meetingRoomId: number): Observable<void> {
        return this.http.delete<void>(this.myAppUrl + this.myApiUrl + meetingRoomId, { headers: this.headers });
      }

      //Añadir oficinas en la base de datos
      addRoom(MeetingRoom: MeetingRoom): Observable<MeetingRoom> {
        return this.http.post<MeetingRoom>(this.myAppUrl + this.myApiUrl, MeetingRoom, { headers: this.headers });
      }

      //Editar datos del pais
      updateRoom(meetingRoomId: number, meetingRoom: MeetingRoom): Observable<void> {
        return this.http.put<void>(this.myAppUrl + this.myApiUrl + meetingRoomId, meetingRoom, { headers: this.headers });
      }
}
