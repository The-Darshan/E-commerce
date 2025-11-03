using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
	private readonly AppDBContext _db;

	public ProductsController(AppDBContext db)
	{
		_db = db;
	}

	}
