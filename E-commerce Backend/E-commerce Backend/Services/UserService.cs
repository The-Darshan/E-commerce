using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

public class UserService : IUserService
{
    private readonly AppDBContext _db;
    private readonly IConfiguration _config;

    public UserService(AppDBContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    public async Task<User?> RegisterAsync(RegisterDto dto)
    {
        // basic check
        var exists = _db.Users.Any(u => u.Email == dto.Email);
        if (exists)
            return null;

        var user = new User
        {
            Username = dto.Username,
            Email = dto.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            ContactNumber = dto.Phone,
            Role = dto.Role ?? "Customer"
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return user;
    }

    public async Task<AuthResponseDto?> AuthenticateAsync(LoginDto dto)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null)
            return null;

        var isValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.Password);
        if (!isValid)
            return null;

        var token = GenerateJwtToken(user);

        // save token optional
        user.token = token;
        await _db.SaveChangesAsync();

        return new AuthResponseDto
        {
            Token = token,
            Username = user.Username,
            Email = user.Email,
            Role = user.Role
        };
    }

    private string GenerateJwtToken(User user)
    {
        var key = _config["Jwt:Key"] ?? _config["JwtKey"] ?? "ThisIsADevSecretKeyChangeMe";
        var issuer = _config["Jwt:Issuer"] ?? "ECommerceAPI";

        var tokenHandler = new JwtSecurityTokenHandler();
        var keyBytes = Encoding.UTF8.GetBytes(key);
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
        };
        if (!string.IsNullOrEmpty(user.Role))
        {
            claims.Add(new Claim(ClaimTypes.Role, user.Role));
        }

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            Issuer = issuer,
            Audience = issuer,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
