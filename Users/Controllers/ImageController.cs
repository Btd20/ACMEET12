using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Users.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ImageController : Controller { 
        
    }
}
