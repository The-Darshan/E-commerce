using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDBContext _db;

    public OrdersController(AppDBContext db)
    {
        _db = db;
    }

    

}