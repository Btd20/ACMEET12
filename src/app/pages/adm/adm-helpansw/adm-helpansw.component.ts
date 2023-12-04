import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailService } from 'src/app/shared/services/email.service';
import { TicketService } from 'src/app/shared/services/ticket.service';

@Component({
  selector: 'app-admhelp-answ',
  templateUrl: './adm-helpansw.component.html',
  styleUrls: ['./adm-helpansw.component.css']
})
export class AdmHelpAnswComponent {
  form: FormGroup;
  ticket: any;
  dialogRef: any;
  @Output() ticketEdited = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private ticketService: TicketService,
    private _snackBar: MatSnackBar,
    private _emailService: EmailService
  ) {
    this.form = this.formBuilder.group({
      answer: [data.ticketAnswer || '', Validators.required],
      title: [''],
      problem: [''],
      userId: [''],
    });
    this.ticket = data.ticket;
  }

  editarTicket() {
    if (this.form.valid) {
      const ticketId = this.ticket.id;
      const answer = this.form.value.answer;

      const ticketData = {
        id: ticketId,
        title: this.ticket.title,
        status: 'Closed',
        problem: this.ticket.problem,
        answer: answer,
        userId: this.ticket.userId,
        email: this.ticket.email,
        admin: sessionStorage.getItem('user')
      };

      this.ticketService.updateTicket(ticketId, ticketData).subscribe(
        response => {
          console.log('Ticket editado con éxito:', response);
          this._snackBar.open('Ticket editado con éxito', 'Cerrar', { duration: 2000 });
          this.ticketEdited.emit();
          this._emailService.sendTicketResponse(ticketData).subscribe(
            );
        },
        error => {
          console.error('Error al editar el ticket:', error);
          this._snackBar.open('Error al editar el ticket', 'Cerrar', { duration: 2000 });
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  mensajeErrorExito(texto: string) {
    this._snackBar.open(`${texto}`, '', {
      duration: 700,
      verticalPosition: 'bottom'
    });
  
    // Espera un breve momento y luego cierra el diálogo
    setTimeout(() => {
      this.dialogRef.close();
    }, 1300); // Ajusta el tiempo según sea necesario
  }
}

