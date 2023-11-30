using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AuthorizationServer.Data;

public class UsersDbContext : IdentityDbContext<IdentityUser>
{
	public UsersDbContext(DbContextOptions<UsersDbContext> options)
		: base(options) { }

	protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating(builder);
	}
}
