using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
	private readonly AppDBContext _db;

	public UsersController(AppDBContext db)
	{
		_db = db;
	}

    [HttpGet]
    public async Task<IActionResult> GetUser()
    {
        try
        {

            var user = await _db.Users.FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound(new { message = "No user found." });
            }

            return Ok(user);

        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while retrieving user.", error = ex.Message });
        }
    }

    [HttpPut("updateUser")]
    public async Task<IActionResult> UpdateUser([FromBody] UserProfileUpdateDto updatedUser)
    {
        try
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == updatedUser.Id);

            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            bool isModified = false;

            if (user.Username != updatedUser.Username)
            {
                user.Username = updatedUser.Username;
                isModified = true;
            }
            if (user.ContactNumber != updatedUser.ContactNumber)
            {
                user.ContactNumber = updatedUser.ContactNumber;
                isModified = true;
            }
            if (user.Address != updatedUser.Address)
            {
                user.Address = updatedUser.Address;
                isModified = true;
            }
            if (updatedUser.DateOfBirth != null)
            {
                if (DateOnly.TryParse(updatedUser.DateOfBirth, out var dob))
                {
                    if (user.DateOfBirth != dob)
                    {
                        user.DateOfBirth = dob;
                        isModified = true;
                    }
                }
            }
            if (updatedUser.Gender != null)
            {
                var genderEnum = (Gender)updatedUser.Gender.Value;
                if (user.Gender != genderEnum)
                {
                    user.Gender = genderEnum;
                    isModified = true;
                }
            }

            if (!isModified)
            {
                return Ok(new { message = "No changes detected. User not updated." });
            }

            await _db.SaveChangesAsync();

            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while updating user.", error = ex.Message });
        }
    }

}
