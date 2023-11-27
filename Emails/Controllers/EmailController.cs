using Emails.Models;
using Microsoft.AspNetCore.Mvc;
using Mjml.Net;
using System.IO;
using static System.Net.Mime.MediaTypeNames;

namespace Emails.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("ConfirmarReserva/{userEmail}")]
        public async Task <IActionResult> ConfirmarReserva(string userEmail, Reserve reserve)
        {
            var mjmlRenderer = new MjmlRenderer();
            var correu = System.IO.File.ReadAllText("./Emails/confirmacio_reserva.mjml");

            correu = correu.Replace("{NomSala}", reserve.MeetingRoomName);
            correu = correu.Replace("{DataReserva}", reserve.ReserveDate.ToShortDateString());
            correu = correu.Replace("{HoraInici}", reserve.StartTime);
            correu = correu.Replace("{HoraFi}", reserve.EndTime);

            var options = new MjmlOptions
            {
                Beautify = false
            };

            var (html, errors) = mjmlRenderer.Render(correu, options);

            _emailService.SendEmail(userEmail, "Confirmació de reserva", html);

            return Ok();
        }

        [HttpPost("ConfirmarTicket/{userEmail}")]
        public async Task<IActionResult> ConfirmarTicket(string userEmail, Ticket ticket)
        {
            var mjmlRenderer = new MjmlRenderer();
            var correu = System.IO.File.ReadAllText("./Emails/confirmacio_ticket.mjml");

            correu = correu.Replace("{Title}", ticket.Title);
            correu = correu.Replace("{Problem}", ticket.Problem);

            var options = new MjmlOptions
            {
                Beautify = false
            };

            var (html, errors) = mjmlRenderer.Render(correu, options);

            _emailService.SendEmail(userEmail, "Confirmació de Ticket", html);

            return Ok();
        }

        [HttpPost("RespostaTicket/{userEmail}")]
        public async Task<IActionResult> RespostaTicket(string userEmail, Ticket ticket)
        {
            var mjmlRenderer = new MjmlRenderer();
            var correu = System.IO.File.ReadAllText("./Emails/resposta_ticket.mjml");

            correu = correu.Replace("{Title}", ticket.Title);
            correu = correu.Replace("{Problem}", ticket.Problem);
            correu = correu.Replace("{Answer}", ticket.Answer);
            correu = correu.Replace("{Admin}", ticket.Admin);

            var options = new MjmlOptions
            {
                Beautify = false
            };

            var (html, errors) = mjmlRenderer.Render(correu, options);

            _emailService.SendEmail(userEmail, "Resposta al teu ticket", html);

            return Ok();
        }

    }
}
