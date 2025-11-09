public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Role { get; set; }
}
