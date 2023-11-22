using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Ticket.Models
{
    public class TicketDbContext : DbContext
    {
        public TicketDbContext(DbContextOptions<TicketDbContext> options) : base(options)
        {
        }

        public DbSet<TicketModel> Ticket { get; set; }
    }
}
