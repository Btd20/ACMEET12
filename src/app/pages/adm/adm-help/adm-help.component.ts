import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../shared/services/profile.service';
import { AdmHelpAnswComponent } from '../adm-helpansw/adm-helpansw.component';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { ImageService } from 'src/app/shared/services/ImageService ';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-help',
  templateUrl: './adm-help.component.html',
  styleUrls: ['./adm-help.component.css']
})
export class admHelpComponent implements OnInit {
  tickets: any[] = []; // Asegúrate de que la estructura de tus tickets coincida con la recibida desde el backend
  userId: string | null = sessionStorage.getItem('userId');

  constructor(
    private _userService: ProfileService, 
    private dialog: MatDialog,
    private _ticketService: TicketService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.getTickets(); // Llama a la función para obtener los tickets al inicializar el componente
  }

  openDialogAgregarReserva() {
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(AdmHelpAnswComponent, { data: { pathname }, panelClass: 'no-scroll' });
  }

  getTickets() {
    // Llama al servicio para obtener los tickets desde el backend
    this._ticketService.getTickets().subscribe(
      (response: any) => {
        this.tickets = response.map((ticket: any) => {
          // Agrega un campo de imagen a cada ticket antes de agregarlo al array
          ticket.image = null; // Puedes inicializarlo con un valor predeterminado si es necesario
          this.fetchAndUpdateProfilePicture(ticket.userId, ticket); // Usa "userId" con la "u" minúscula
          return ticket;
        });
      },
      (error) => {
        console.error('Error fetching tickets', error);
      }
    );
  }

  fetchAndUpdateProfilePicture(userId: string, ticket: any): void {
    if (userId) {
      this.imageService.getImage(userId)
        .subscribe(
          (imageData: ArrayBuffer) => {
            console.log('Imagen obtenida correctamente');
            const base64String = this.arrayBufferToBase64(imageData);
            // Asigna la imagen al campo image del ticket
            ticket.image = 'data:image/jpeg;base64,' + base64String;
          },
          (error) => {
            console.error('Error al obtener la imagen', error);
            // Si hay un error, puedes asignar una imagen predeterminada
            // o manejarlo según tus requisitos
          }
        );
    } else {
      console.error('userId es null');
    }
  }  

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
