using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Images.Models
{
    public class ImageDbContext : DbContext
    {
        public ImageDbContext(DbContextOptions<ImageDbContext> options) : base(options)
        {
        }

        public DbSet<ImageModel> Images { get; set; }
    }

}
