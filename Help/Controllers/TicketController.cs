using Ticket.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ticket.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly TicketDbContext _context;

        public TicketController(TicketDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<TicketModel>>> GetTicketsByUserId(string userId)
        {
            var tickets = await _context.Ticket.Where(t => t.UserId == userId).ToListAsync();

            if (tickets == null || tickets.Count == 0)
            {
                return NotFound();
            }

            return Ok(tickets);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TicketModel>>> GetAllTickets()
        {
            var tickets = await _context.Ticket.ToListAsync();

            if (tickets == null || tickets.Count == 0)
            {
                return NotFound();
            }

            // Manejar valores nulos en la propiedad Answer
            foreach (var ticket in tickets)
            {
                if (ticket.Answer == null)
                {
                    ticket.Answer = "Sin respuesta"; // O el valor predeterminado que desees
                }
            }

            return Ok(tickets);
        }

        [HttpPost]
        public async Task<ActionResult<TicketModel>> CreateTicket(TicketModel ticket)
        {
            _context.Ticket.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
        }

        [HttpGet("ticket/{id}")]
        public async Task<ActionResult<TicketModel>> GetTicket(int id)
        {
            var ticket = await _context.Ticket.FindAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Ticket.FindAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            _context.Ticket.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(int id, TicketModel updatedTicket)
        {
            if (id != updatedTicket.Id)
            {
                return BadRequest();
            }

            var existingTicket = await _context.Ticket.FindAsync(id);

            if (existingTicket == null)
            {
                return NotFound();
            }

            // Aquí actualiza las propiedades necesarias del ticket existente con los valores de updatedTicket
            existingTicket.Title = updatedTicket.Title;
            existingTicket.Status = updatedTicket.Status;
            existingTicket.Problem = updatedTicket.Problem;
            existingTicket.Answer = updatedTicket.Answer;
            existingTicket.Admin = updatedTicket.Admin;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Manejar excepciones de concurrencia si es necesario
                throw;
            }
        }
    }
}
