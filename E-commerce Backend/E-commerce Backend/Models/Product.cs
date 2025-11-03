public class Product
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required decimal Price { get; set; }
    public string Currency { get; set; } = "IND";
    public required string Description { get; set; }
    public required string ImageUrl { get; set; }
    public int StockCount { get; set; }
    public required Category Category { get; set; }
    public int CategoryId { get; set; }
    public List<RatingReview>? RatingAndReviews { get; set; }
    public List<User>? PurchasedBy { get; set; }
}