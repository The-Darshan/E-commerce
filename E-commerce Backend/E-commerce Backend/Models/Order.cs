public class Order
{
    public int Id { get; set; }
    public required int UserId { get; set; }
    public required User User { get; set; }
    public List<Product> OrderItems { get; set; }
    public int TotalAmount { get; set; }
    public required DateTime OrderDate { get; set; }
    public required string ShippingAddress { get; set; }
}
