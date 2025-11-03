public class RatingReview
{
    public int Id { get; set; }
    public required string Review { get; set; }
    public required int Rating { get; set; }
    public required User User { get; set; }
    public int UserId { get; set; }
    public required Product Product { get; set; }
    public int ProductId { get; set; }
}