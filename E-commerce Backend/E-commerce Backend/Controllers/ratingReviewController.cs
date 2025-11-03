using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class RatingReviewController : ControllerBase
{
	private readonly AppDBContext _db;

	public RatingReviewController(AppDBContext db)
	{
		_db = db;
	}


}
