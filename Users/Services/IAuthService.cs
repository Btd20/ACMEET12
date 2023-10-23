using Users.Models;

namespace Users.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterUser(LoginUser user);
        Task<bool> Login(LoginUser user);
        string GenerateTokenString(LoginUser user);

        Task<bool> ChangePassword(LoginUser user, ChangePassword model);
        Task<bool> addRol(String userId, String rol);
        Task<bool> isAdministrador(String userId);
    }
}
