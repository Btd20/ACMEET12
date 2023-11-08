using Images.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace Images.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ImageDbContext _context;

        public ImageController(ImageDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ImageModel>> GetImage(string id)
        {
            var image = await _context.Images.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return File(image.ProfileImage, "image/jpeg");
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<ImageModel>> UploadImage(string id, IFormFile file)
        {
            byte[] imageData;

            using (var binaryReader = new BinaryReader(file.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)file.Length);
            }

            var existingImage = await _context.Images.FindAsync(id);

            if (existingImage != null)
            {
                // Si la imagen ya existe, actualiza los datos de la imagen.
                existingImage.ProfileImage = imageData;
            }
            else
            {
                // Si no existe, crea un nuevo registro.
                var imageModel = new ImageModel
                {
                    Id = id,
                    ProfileImage = imageData
                };
                _context.Images.Add(imageModel);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetImage), new { id = id }, null);
        }
    }
}
