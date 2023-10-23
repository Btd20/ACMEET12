import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionStatusService {
  private onlineSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor() {
    // Escuchar el evento de conexión en el objeto window y actualizar el estado en consecuencia.
    window.addEventListener('online', () => {
      this.onlineSubject.next(true);
    });

    window.addEventListener('offline', () => {
      this.onlineSubject.next(false);
    });
  }

  isOnline(): Observable<boolean> {
    return this.onlineSubject.asObservable();
  }

}
