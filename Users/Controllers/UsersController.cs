using Users.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Users.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            this._context = context;
        }

        //Enviar la lista de Users
        [HttpGet]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Get()
        {
            try
            {
                Thread.Sleep(500);
                var listaUsers = await _context.Users.ToListAsync();
                return Ok(listaUsers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Obtener el usuario con su id
        [HttpGet("{userId}")]
        public async Task<IActionResult> Get(string userId)
        {
            try
            {

                var user = await _context.Users.FindAsync(userId);

                if (user == null)
                {
                    var userByName = await _context.Users.FirstOrDefaultAsync(u => u.UserName == userId);
                    if (userByName != null)
                    {
                        return Ok(userByName);
                    }
                    var userByEmail = await _context.Users.FirstOrDefaultAsync(u => u.Email == userId);
                    if (userByEmail != null)
                    {
                        return Ok(userByEmail);
                    }

                    return NotFound();
                }
                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Eliminar usuario con su id 
        [HttpDelete("{userId}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Delete(string userId)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return NotFound();
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // Editar el usuario pasando su id y su nuevos datos
        [HttpPut("{userId}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Put(string userId, AppUsers user)
        {
            try
            {
                if (userId != user.Id)
                {
                    return BadRequest();
                }

                var userItem = await _context.Users.FindAsync(userId);

                if (userItem == null)
                {
                    return NotFound();
                }

                var userNameExist = await _context.Users.FirstOrDefaultAsync(u => u.UserName == user.UserName && u.Id != userId);
                var userMailExist = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email && u.Id != userId);

                if (userNameExist != null)
                {
                    return Conflict("The name already exist");
                }
                else if (userMailExist != null)
                {
                    return Conflict("The mail already exist");
                }
                else
                {
                    userItem.UserName = user.UserName;
                    userItem.NormalizedUserName = user.NormalizedUserName;
                    userItem.PhoneNumber = user.PhoneNumber;
                    userItem.Email = user.Email;
                }

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
