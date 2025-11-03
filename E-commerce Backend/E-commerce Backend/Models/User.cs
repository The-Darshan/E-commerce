public enum Gender
{
    Male,
    Female,
    Other
}

public class User
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public Gender? Gender { get; set; }
    public DateOnly? DateOfBirth { get; set; }
    public string? ContactNumber { get; set; }
    public string? Address { get; set; }

    public List<Product>? PurchasedProducts { get; set; }
}