using Images.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace Images.Controllers
{
    //POST: api/ApplicationUsers/{username}/UploadProfileImage
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

        [HttpPost]
        public async Task<ActionResult<ImageModel>> UploadImage(string id, IFormFile file)
        {
            byte[] imageData;

            using (var binaryReader = new BinaryReader(file.OpenReadStream()))
            {
                imageData = binaryReader.ReadBytes((int)file.Length);
            }

            var imageModel = new ImageModel
            {
                Id = id,
                ProfileImage = imageData
            };

            _context.Images.Add(imageModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetImage), new { id = imageModel.Id }, imageModel);
        }
    }
}
