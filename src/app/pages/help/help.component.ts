import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { ImageService } from 'src/app/shared/services/ImageService ';
import { TicketService } from 'src/app/shared/services/ticket.service';
import { HelpSeeTicketComponent } from '../help-see-ticket/help-see-ticket.component';
import { MatDialog } from '@angular/material/dialog';
import { PopRemoveQuestionComponent } from '../alerts/alert.component';
import { EmailService } from 'src/app/shared/services/email.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class helpComponent implements OnInit {
  ticketForm!: FormGroup;
  userTickets: any[] = [];
  default_url: string = "https://imgs.search.brave.com/GrTMprW4fg05XTsfzacsNofnbaMJuXlbLIXZqUAn9vg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw";
  profilepictureId: SafeUrl | undefined;

  constructor(private formBuilder: FormBuilder, 
              private ticketService: TicketService,
              private imageService: ImageService,
              private dialog: MatDialog,
              private _emailService: EmailService) {}

  ngOnInit() {
    const userId = sessionStorage.getItem('userId');
    
    if (userId) {
      this.getTickets(userId);
    }
    
    this.ticketForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
    });

  }

  getTickets(userId: string) {
    if (userId) {
      this.ticketService.getTicketsByUserId(userId).subscribe(
        (response: any[]) => {
          this.userTickets = response;
        },
        (error) => {
          console.error('Error fetching user tickets', error);
        }
      );

      this.fetchAndUpdateProfilePicture(userId);
    }
  }

  openDialogVerTicket(ticket: any) {
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(HelpSeeTicketComponent, { data: { ticket }, panelClass: 'no-scroll' });
  
    /*dialogRef.componentInstance.ticketClosed.subscribe(() => {
      dialogRef.close();
    });*/
  }

  openDialog(identification: number){
    const userId = sessionStorage.getItem('userId');
    let pathname = window.location.pathname;
    const dialogRef = this.dialog.open(PopRemoveQuestionComponent, {data: {identification, pathname}});
    
    dialogRef.afterClosed().subscribe(result => {
      if (userId) {
        this.getTickets(userId);
      }
    });  
  }

  createTicket() {
    const userId = sessionStorage.getItem('userId');
    if (this.ticketForm && this.ticketForm.valid) {
      const newTicket = {
        title: this.ticketForm.value.title,
        email: sessionStorage.getItem('userEmail'),
        problem: this.ticketForm.value.message,
        userId: sessionStorage.getItem('userId'),
        status: 'Open'
      };

      this.ticketService.createTicket(newTicket).subscribe(
        response => {
          console.log('Ticket creado con éxito:', response);
          this.ticketForm.reset();
          if (userId) {
            this.getTickets(userId);
          }
          this._emailService.sendTicketConfirmationEmail(newTicket).subscribe(
          );
        },
        error => {
          console.error('Error al crear el ticket:', error);
        }
      );
    } else {
      if (this.ticketForm) {
        this.ticketForm.markAllAsTouched();
      }
    }
  }

  fetchAndUpdateProfilePicture(userId: string): void {
    this.imageService.getImage(userId!)
      .subscribe(
        (imageData: ArrayBuffer) => {
          console.log('Imagen obtenida correctamente');
          const base64String = this.arrayBufferToBase64(imageData);
          this.profilepictureId = 'data:image/jpeg;base64,' + base64String;
        },
        (error) => {
          console.error('Error al obtener la imagen', error);
          this.profilepictureId = this.default_url;
        }
      );
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
