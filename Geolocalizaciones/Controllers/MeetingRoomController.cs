using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MeetingRoomController : ControllerBase
    {
        private readonly AplicationDbContext _context;

        public MeetingRoomController(AplicationDbContext context)
        {
            this._context = context;
        }

        // Obtener la lista de las salas
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                Thread.Sleep(500);
                var listaMeetingRoom = await _context.MeetingRoom.ToListAsync();
                return Ok(listaMeetingRoom);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Obtener la la lista de Salas con los nombres de las oficinas y las id
        [HttpGet("RoomsWithOffices")]
        public async Task<IActionResult> GetMeetingRoomsWithOffices()
        {
            try
            {
                var listaMeetingRoom = await _context.MeetingRoom.
                    Join(
                    _context.Office,
                    MeetingRoom => MeetingRoom.OfficeId,
                    Office => Office.OfficeId,
                    (MeetingRoom, Office) => new
                    {
                        MeetingRoomId = MeetingRoom.MeetingRoomId,
                        MeetingRoomName = MeetingRoom.MeetingRoomName,
                        OfficeId = MeetingRoom.OfficeId,
                        NameOffice = Office.NameOffice
                    }
                ).ToListAsync();

                return Ok(listaMeetingRoom);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        // Obtener la oficina con la id pasada
        [HttpGet("{meetingRoomId}")]
        public async Task<IActionResult> Get(int meetingRoomId)
        {
            try
            {
                var meetingRoom = await _context.MeetingRoom.FindAsync(meetingRoomId);
                if (meetingRoom == null)
                {
                    return NotFound();
                }
                return Ok(meetingRoom);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Eliminar oficina con la id pasada 
        [HttpDelete("{meetingRoomId}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Delete(int meetingRoomId)
        {
            try
            {
                var meetingRoom = await _context.MeetingRoom.FindAsync(meetingRoomId);
                if (meetingRoom == null)
                {
                    return NotFound();
                }

                _context.MeetingRoom.Remove(meetingRoom);
                await _context.SaveChangesAsync();

                return NoContent();

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Obtener las oficinas
        [HttpGet("offices")]
        public IActionResult MeetingroomOffices()
        {
            try
            {
                List<Office> offices = _context.Office.ToList();
                return Ok(offices);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // Editar la sala pasando la id y el objeto de MeetingRoom
        [HttpPut("{meetingRoomId}")]
        [Authorize(Roles = "Administrador")]
        public async Task<IActionResult> Put(int meetingRoomId, MeetingRoom meetingRoom)
        {
            try
            {
                if (meetingRoomId != meetingRoom.MeetingRoomId)
                {
                    return BadRequest();
                }

                var meetingRoomItem = await _context.MeetingRoom.FindAsync(meetingRoomId);

                if (meetingRoomItem == null)
                {
                    return NotFound();
                }

                meetingRoomItem.MeetingRoomName = meetingRoom.MeetingRoomName;
                meetingRoomItem.OfficeId = meetingRoom.OfficeId;

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Obtener Salas pasando coincidiendo con la id de oficina 
        [HttpGet("office/{officeId}")]
        public async Task<IActionResult> GetRoomsByOffice(int officeId)
        {
            try
            {
                var meeting = await _context.MeetingRoom.Where(m => m.OfficeId == officeId).ToListAsync();

                if (meeting.Count == 0)
                {
                    return NotFound();
                }

                return Ok(meeting);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

