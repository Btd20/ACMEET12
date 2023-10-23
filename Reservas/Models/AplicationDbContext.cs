using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Reservas.Models;

namespace Backend.Models
{
    //Crear la base de datos
    public class AplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options): base(options) 
        { 
        
        }

        /* public DbSet<Country> Country { get; set; } //Nombre de la tabla
         public DbSet<City> City { get; set; }
         public DbSet<Office> Office { get; set; }*/
         public DbSet<MeetingRoom> MeetingRoom { get; set; }
        /* public DbSet<AppUsers> User { get; set; }*/
        public DbSet<Reserve> Reserve { get; set; }


        //Aqui es donde haces las foreign keys o algo
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityUserRole<string>>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<IdentityUserLogin<string>>()
                .HasKey(l => new { l.LoginProvider, l.ProviderKey });

            modelBuilder.Entity<IdentityUserToken<string>>()
              .HasKey(t => new { t.UserId, t.LoginProvider, t.Name });

            /*modelBuilder.Entity<City>()
                .HasOne<Country>()
                .WithMany()
                .HasForeignKey(c => c.CountryId);

            modelBuilder.Entity<Office>()
                .HasOne<City>()
                .WithMany()
                .HasForeignKey(c => c.CityId);*/


            modelBuilder.Entity<MeetingRoom>()
               .HasOne<Office>()
               .WithMany()
               .HasForeignKey(c => c.OfficeId);

            modelBuilder.Entity<Reserve>()
              .HasOne<MeetingRoom>()
              .WithMany()
              .HasForeignKey(c => c.MeetingRoomId);

            modelBuilder.Entity<Reserve>()
              .HasOne<AppUsers>()
              .WithMany()
              .HasForeignKey(c => c.UserId);

        }
    }
}
