using Microsoft.AspNetCore.Mvc;
using Mjml.Net;

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

        [HttpPost]
        public IActionResult ConfirmarReserva(string userEmail, string nomSala, DateTime dataReserva, TimeSpan horaInici, TimeSpan horaFi)
        {
            var mjmlRenderer = new MjmlRenderer();
            var correu = System.IO.File.ReadAllText("./Emails/confirmacio_reserva.mjml");

            correu = correu.Replace("{NomSala}", nomSala);
            correu = correu.Replace("{DataReserva}", dataReserva.ToShortDateString());
            correu = correu.Replace("{HoraInici}", horaInici.ToString());
            correu = correu.Replace("{HoraFi}", horaFi.ToString());

            var options = new MjmlOptions
            {
                Beautify = false
            };

            var (html, errors) = mjmlRenderer.Render(correu, options);

            _emailService.SendEmail(userEmail, "Confirmació de reserva", html);

            return RedirectToAction("ReservaConfirmada");
        }

        //public IActionResult ReservaConfirmada()
        //{
        //    return View();
        //}
    }
}
