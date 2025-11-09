using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        try
        {
            var user = await _userService.RegisterAsync(dto);
            if (user == null)
                return BadRequest(new { message = "User with this email already exists." });

            return Ok(new { message = "User created successfully." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred during registration.", error = ex.Message });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        try
        {
            var auth = await _userService.AuthenticateAsync(dto);
            if (auth == null)
                return Unauthorized(new { message = "Invalid credentials." });

            return Ok(auth);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred during login.", error = ex.Message });
        }
    }
}
