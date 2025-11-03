public class Category
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public string? Description { get; set; }
    public required string ImageUrl { get; set; }
    public List<Product>? Products { get; set; }
}