using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Globalization;



namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReserveController : ControllerBase
    {
        private readonly AplicationDbContext _context;



        public ReserveController(AplicationDbContext context)
        {
            this._context = context;
        }



        // Obtener la lista de Reservas
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var fechaActual = DateTime.Now.Date;
                var listaReservas = await _context.Reserve
                    .Where(r => r.ReserveDate.Date >= fechaActual) // Filtrar por fechas mayores o iguales a la fecha actual
                    .ToListAsync();
                return Ok(listaReservas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        // Obtener una reserva por su id
        [HttpGet("{reserveId}")]
        public async Task<IActionResult> Get(int reserveId)
        {
            try
            {
                var reserva = await _context.Reserve.FindAsync(reserveId);
                if (reserva == null || reserva.ReserveDate.Date >= DateTime.Now.Date)
                {
                    return NotFound();
                }
                return Ok(reserva);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // Obtener una reserva con roomName y userName
        [HttpGet("ReserveRoomUser")]
        public async Task<IActionResult> ReservasWithUserAndRoom()
        {
            try
            {
                var fechaActual = DateTime.Now.Date;
                var listaReservas = await _context.Reserve
                    .Where(r => r.ReserveDate.Date >= fechaActual) // Filtrar por fechas mayores o iguales a la fecha actual
                    .Join(
                            _context.MeetingRoom,
                    reserve => reserve.MeetingRoomId,
                    meetingRoom => meetingRoom.MeetingRoomId,
                    (reserve, meetingRoom) => new { Reserve = reserve, MeetingRoom = meetingRoom }
                )
                .Join(
                    _context.Users,
                    combined => combined.Reserve.UserId,
                    user => user.Id,
                    (combined, user) => new
                    {
                        ReserveId = combined.Reserve.ReserveId,
                        MeetingRoomName = combined.MeetingRoom.MeetingRoomName,
                        UserName = user.UserName,
                        ReserveDate = combined.Reserve.ReserveDate,
                        StartTime = combined.Reserve.StartTime,
                        EndTime = combined.Reserve.EndTime
                    }
                ).ToListAsync();



                if (listaReservas == null)
                {
                    return NotFound();
                }
                return Ok(listaReservas);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        // Obtener una reserva por Id user
        [HttpGet("ReserveByUserId/{userId}")]
        public async Task<IActionResult> ReservasByUserId(string userId)
        {
            try
            {
                var fechaActual = DateTime.Now.Date;
                var listaReservas = await _context.Reserve
               .Join(
                   _context.MeetingRoom,
                   reserve => reserve.MeetingRoomId,
                   meetingRoom => meetingRoom.MeetingRoomId,
                   (reserve, meetingRoom) => new
                   {
                       Reserve = reserve,
                       MeetingRoom = meetingRoom
                   }
               )
               .Where(item => item.Reserve.UserId == userId && item.Reserve.ReserveDate.Date >= fechaActual) // Filtrar por UserId
               .Select(item => new
               {
                   ReserveId = item.Reserve.ReserveId,
                   MeetingRoomName = item.MeetingRoom.MeetingRoomName,
                   ReserveDate = item.Reserve.ReserveDate,
                   StartTime = item.Reserve.StartTime,
                   EndTime = item.Reserve.EndTime,
                   Hours = item.Reserve.hours
               })
               .ToListAsync();



                if (listaReservas == null)
                {
                    return NotFound();
                }
                return Ok(listaReservas);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        // Obtener una reserva por el nomber del usuario
        [HttpGet("ReserveByUserName/{userName}")]
        public async Task<IActionResult> ReservasByUserName(string userName)
        {
            try
            {
                var userBD = _context.Users.FirstOrDefaultAsync(u => u.UserName == userName);
                var fechaActual = DateTime.Now.Date;
                if (userBD == null) { return NotFound(); }



                var listaReservas = await _context.Reserve
                .Join(
                    _context.MeetingRoom,
                    reserve => reserve.MeetingRoomId,
                    meetingRoom => meetingRoom.MeetingRoomId,
                    (reserve, meetingRoom) => new
                    {
                        Reserve = reserve,
                        MeetingRoom = meetingRoom
                    }
                )
                .Where(item => item.Reserve.UserId == userBD.Result.Id.ToString() && item.Reserve.ReserveDate.Date >= fechaActual) // Filtrar por UserId
                .Select(item => new
                {
                    ReserveId = item.Reserve.ReserveId,
                    MeetingRoomName = item.MeetingRoom.MeetingRoomName,
                    ReserveDate = item.Reserve.ReserveDate,
                    StartTime = item.Reserve.StartTime,
                    EndTime = item.Reserve.EndTime
                })
                .ToListAsync();



                if (listaReservas == null)
                {
                    return NotFound();
                }
                return Ok(listaReservas);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        // Eliminar una reserva por su id
        [HttpDelete("{reserveId}")]
        public async Task<IActionResult> Delete(int reserveId)
        {
            try
            {
                var reserva = await _context.Reserve.FindAsync(reserveId);
                if (reserva == null)
                {
                    return NotFound();
                }



                _context.Reserve.Remove(reserva);
                await _context.SaveChangesAsync();



                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        // Agregar una reserva
        [HttpPost]
        public async Task<IActionResult> Post(Reserve reserve)
        {
            try
            {
                // Convertir horas de inicio y fin a objetos DateTime
                DateTime startTime = DateTime.ParseExact(reserve.StartTime, "HH:mm", CultureInfo.InvariantCulture);
                DateTime endTime = DateTime.ParseExact(reserve.EndTime, "HH:mm", CultureInfo.InvariantCulture);



                // Verificar que las horas de inicio y fin sean válidas
                if (startTime >= endTime)
                {
                    return Conflict("The hours of start and end are not valids.");
                }



                // Obtener todas las reservas para el mismo día y sala desde la base de datos
                var existingReservations = await _context.Reserve
                    .Where(r =>
                        r.MeetingRoomId == reserve.MeetingRoomId &&
                        r.ReserveDate.Date == reserve.ReserveDate.Date)
                    .ToListAsync();



                // Verificar si ya existe una reserva que contenga las mismas horas de inicio y fin
                bool hasExactMatch = existingReservations.Any(r =>
                    DateTime.ParseExact(r.StartTime, "HH:mm", CultureInfo.InvariantCulture) == startTime &&
                    DateTime.ParseExact(r.EndTime, "HH:mm", CultureInfo.InvariantCulture) == endTime);



                if (hasExactMatch)
                {
                    return Conflict("There is a reservation with the same start and end times for the same day and room");
                }



                // Verificar si ya existe una reserva que colisiona con las horas de inicio y fin
                bool hasCollisions = existingReservations.Any(r =>
                    (DateTime.ParseExact(r.StartTime, "HH:mm", CultureInfo.InvariantCulture) >= startTime &&
                     DateTime.ParseExact(r.StartTime, "HH:mm", CultureInfo.InvariantCulture) < endTime) ||
                    (DateTime.ParseExact(r.EndTime, "HH:mm", CultureInfo.InvariantCulture) > startTime &&
                     DateTime.ParseExact(r.EndTime, "HH:mm", CultureInfo.InvariantCulture) <= endTime));



                if (hasCollisions)
                {
                    return Conflict("A reservation exists that conflicts with the specified start and end times.");
                }



                Debug.Write(reserve.hours);
                Debug.Write(reserve.ReserveDate);



                _context.Add(reserve);
                await _context.SaveChangesAsync();



                return CreatedAtAction("Get", new { ReserveId = reserve.ReserveId }, reserve);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        // Actualizar una reserva por su id
        [HttpPut("{reserveId}")]
        public async Task<IActionResult> Put(int reserveId, Reserve reserve)
        {
            try
            {
                if (reserveId != reserve.ReserveId)
                {
                    return BadRequest();
                }



                var reservaItem = await _context.Reserve.FindAsync(reserveId);



                if (reservaItem == null)
                {
                    return NotFound();
                }



                // Convertir horas de inicio y fin a objetos DateTime
                DateTime startTime = DateTime.ParseExact(reserve.StartTime, "HH:mm", CultureInfo.InvariantCulture);
                DateTime endTime = DateTime.ParseExact(reserve.EndTime, "HH:mm", CultureInfo.InvariantCulture);



                // Verificar que las horas de inicio y fin sean válidas
                if (startTime >= endTime)
                {
                    return BadRequest("The hours of start and end are not valids");
                }



                // Obtener todas las reservas para el mismo día y sala desde la base de datos
                var existingReservations = await _context.Reserve
                    .Where(r =>
                        r.MeetingRoomId == reserve.MeetingRoomId &&
                        r.ReserveDate.Date == reserve.ReserveDate.Date &&
                        r.ReserveId != reserveId)
                    .ToListAsync();



                // Verificar si ya existe una reserva que colisiona con las horas de inicio y fin
                bool hasCollisions = existingReservations.Any(r =>
                    (DateTime.ParseExact(r.StartTime, "HH:mm", CultureInfo.InvariantCulture) >= startTime &&
                     DateTime.ParseExact(r.StartTime, "HH:mm", CultureInfo.InvariantCulture) < endTime) ||
                    (DateTime.ParseExact(r.EndTime, "HH:mm", CultureInfo.InvariantCulture) > startTime &&
                     DateTime.ParseExact(r.EndTime, "HH:mm", CultureInfo.InvariantCulture) <= endTime));



                if (hasCollisions)
                {
                    return BadRequest("A reservation exists that conflicts with the specified start and end times.");
                }



                // Verificar si ya existe una reserva que contenga las mismas horas de inicio y fin
                bool hasExactMatch = existingReservations.Any(r =>
                    DateTime.ParseExact(r.StartTime, "HH:mm", CultureInfo.InvariantCulture) == startTime &&
                    DateTime.ParseExact(r.EndTime, "HH:mm", CultureInfo.InvariantCulture) == endTime);



                if (hasExactMatch)
                {
                    return BadRequest("There is a reservation with the same start and end times for the same day and room");
                }



                // Actualizar propiedades de reserva
                reservaItem.MeetingRoomId = reserve.MeetingRoomId;
                reservaItem.ReserveDate = reserve.ReserveDate;
                reservaItem.StartTime = reserve.StartTime;
                reservaItem.EndTime = reserve.EndTime;
                reservaItem.UserId = reserve.UserId;



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