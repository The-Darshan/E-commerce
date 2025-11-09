using System.Threading.Tasks;

public interface IUserService
{
    Task<AuthResponseDto?> AuthenticateAsync(LoginDto dto);
    Task<User?> RegisterAsync(RegisterDto dto);
}
