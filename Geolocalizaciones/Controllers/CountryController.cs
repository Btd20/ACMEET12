using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CountryController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public CountryController(AplicationDbContext context)
        {
            this._context = context;
        }


        // Obtener la lista de Paises
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                Thread.Sleep(500);
                var listaCountries = await _context.Country.ToListAsync();
                return Ok(listaCountries);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Obtener el pais con la id que ha pasado
        [HttpGet("{countryId}")]
        public async Task<IActionResult> Get(int countryId)
        {
            try
            {
                var country = await _context.Country.FindAsync(countryId);
                if (country == null)
                {
                    return NotFound();
                }
                return Ok(country);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        // Eliminar el pais con la id pasada 
        [HttpDelete("{countryId}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Delete(int countryId)
        {
            try
            {
                var country = await _context.Country.FindAsync(countryId);
                if (country == null)
                {
                    return NotFound();
                }

                _context.Country.Remove(country);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //Añadir nuevo país pasando un objeto Country
        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Post(Country country)
        {
            try
            {
                _context.Add(country);
                await _context.SaveChangesAsync();

                return CreatedAtAction("Get", new { CountryId = country.CountryId }, country);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }


        //Editar el country pasando la id del pais y objeto Country
        [HttpPut("{countryId}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Put(int countryId, Country country)
        {
            try
            {
                //Not found id
                if (countryId != country.CountryId)
                {
                    return BadRequest();
                }

                //Definir el country anterior
                var countryItem = await _context.Country.FindAsync(countryId);

                if (countryItem == null)
                {
                    return NotFound();
                }

                //Definir el country nuevo
                countryItem.CountryName = country.CountryName;

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
