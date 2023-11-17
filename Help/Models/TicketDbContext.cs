using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using System.Reflection.Emit;

namespace Ticket.Models
{
    public class TicketDbContext : DbContext
    {
        public TicketDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseSqlServer("Server=(localdb)\mssqllocaldb;Database=MyApp;Integrated Security=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticket>().ToTable("Tickets");
        }
    }
}
