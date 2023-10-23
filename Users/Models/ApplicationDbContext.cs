using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Users.Models
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        //Aqui es donde haces las foreign keys o algo
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityUserRole<string>>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<IdentityUserLogin<string>>()
                .HasKey(l => new { l.LoginProvider, l.ProviderKey });

            modelBuilder.Entity<IdentityUserToken<string>>()
              .HasKey(t => new { t.UserId, t.LoginProvider, t.Name });
              
            modelBuilder.Entity<AppUsers>()
                .HasKey(u => u.Id);


            // Configurar la relación con ON DELETE CASCADE para UserRoles
            modelBuilder.Entity<IdentityUserRole<string>>()
               .HasOne<IdentityUser>()
               .WithMany()
               .HasForeignKey(ur => ur.UserId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<IdentityUserRole<string>>()
                .HasOne<IdentityRole>()
                .WithMany()
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
