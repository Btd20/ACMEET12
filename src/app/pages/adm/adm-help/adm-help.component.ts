import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../shared/services/profile.service';
import { AdmHelpAnswComponent } from '../adm-helpansw/adm-helpansw.component';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { ImageService } from 'src/app/shared/services/ImageService ';
import { SafeUrl } from '@angular/platform-browser';
import { UsersService } from 'src/app/shared/services/users.service';
import { PopRemoveQuestionComponent } from '../../alerts/alert.component';

@Component({
  selector: 'app-help',
  templateUrl: './adm-help.component.html',
  styleUrls: ['./adm-help.component.css']
})
export class admHelpComponent implements OnInit {
  tickets: any[] = []; // Asegúrate de que la estructura de tus tickets coincida con la recibida desde el backend
  userId: string | null = sessionStorage.getItem('userId');
  default_url: string = "https://imgs.search.brave.com/GrTMprW4fg05XTsfzacsNofnbaMJuXlbLIXZqUAn9vg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw";
  dialogRef: any;

  constructor(
    private _userService: ProfileService, 
    private dialog: MatDialog,
    private _ticketService: TicketService,
    private imageService: ImageService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.getTickets(); // Llama a la función para obtener los tickets al inicializar el componente
  }

  openDialogResponderTicket(ticket: any) {
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(AdmHelpAnswComponent, { data: { ticket, pathname }, panelClass: 'no-scroll' });
  
    dialogRef.componentInstance.ticketEdited.subscribe(() => {
      dialogRef.close();
      this.getTickets();
    });
  }

  getTickets() {
    this._ticketService.getTickets().subscribe(
      (response: any) => {
        this.tickets = response.map((ticket: any) => {
          ticket.image = null;
          ticket.userName = null;
          this.getUserNameById(ticket.userId, ticket);
          this.fetchAndUpdateProfilePicture(ticket.userId, ticket);
          return ticket;
        });
      },
      (error) => {
        console.error('Error fetching tickets', error);
      }
    );
  }

  getUserNameById(userId: string, ticket: any): void {
    if (userId) {
      this.usersService.getUserById(userId).subscribe(
        (user: any) => {
          ticket.userName = user.userName;
        },
        (error) => {
          console.error('Error al obtener el usuario', error);
        }
      );
    }
  }
  

  fetchAndUpdateProfilePicture(userId: string, ticket: any): void {
    if (userId) {
      this.imageService.getImage(userId)
        .subscribe(
          (imageData: ArrayBuffer) => {
            console.log('Imagen obtenida correctamente');
            const base64String = this.arrayBufferToBase64(imageData);
            ticket.image = 'data:image/jpeg;base64,' + base64String;
          },
          (error) => {
            console.error('Error al obtener la imagen', error);
            ticket.image = this.default_url;
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

  openDialog(identification: number){
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identification, pathname}});
    
    dialogRef.afterClosed().subscribe(result => {
      this.getTickets();
    });
  }
}
