using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Session;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OfficeController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public OfficeController(AplicationDbContext context)
        {
            this._context = context;
        }

        //Obtener la lista de Oficinas
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                Thread.Sleep(500);
                var listaOffice = await _context.Office.ToListAsync();
                return Ok(listaOffice);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Obtener la lista de oficina con el nombre de la ciudad y la id
        [HttpGet("OfficesWithCity")]
        public async Task<IActionResult> OfficeswithCity()
        {
            try
            {
                Thread.Sleep(500);
                var listaOffice = await _context.Office.
                    Join(
                    _context.City,
                    Office => Office.CityId,
                    City => City.CityId,
                    (Office, City) => new
                    {
                        OfficeId = Office.OfficeId,
                        NameOffice = Office.NameOffice,
                        CityId = City.CityId,
                        CityName = City.CityName
                    }
                    ).ToListAsync();
                return Ok(listaOffice);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Obtener las oficina con la id que ha pasada
        [HttpGet("{officeId}")]
        public async Task<IActionResult> Get(int officeId)
        {
            try
            {
                var office = await _context.Office.FindAsync(officeId);
                if (office == null)
                {
                    return NotFound();
                }
                return Ok(office);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Eliminar oficina con la id pasada 
        [HttpDelete("{officeId}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Delete(int officeId)
        {
            try
            {
                var office = await _context.Office.FindAsync(officeId);
                if (office == null)
                {
                    return NotFound();
                }

                _context.Office.Remove(office);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Añadir una nueva oficina 
        [HttpPost]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Post(Office office)
        {
            try
            {
                _context.Add(office);
                await _context.SaveChangesAsync();

                return CreatedAtAction("Get", new { OfficeId = office.OfficeId }, office);
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }

        // Modificar la oficina pasando la id y el objeto Office
        [HttpPut("{officeId}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Put(int officeId, Office office)
        {
            try
            {
                if (officeId != office.OfficeId)
                {
                    return BadRequest();
                }

                var officeItem = await _context.Office.FindAsync(officeId);

                if (officeItem == null)
                {
                    return NotFound();
                }

                officeItem.NameOffice = office.NameOffice;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Obtener la lista de oficinas coincidiendo con la id de la ciudad
        [HttpGet("city/{cityId}")]
        public async Task<IActionResult> GetOfficesByCity(int cityId)
        {
            try
            {
                var offices = _context.Office.Where(o => o.CityId == cityId).ToList();

                if (offices.Count == 0)
                {
                    return NotFound();
                }

                return Ok(offices);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
