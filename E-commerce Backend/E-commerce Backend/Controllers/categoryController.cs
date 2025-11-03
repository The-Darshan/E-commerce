using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDBContext _db;
    public CategoriesController(AppDBContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        try
        {
            var categories = await _db.Categories.ToListAsync();
            return Ok(categories);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while retrieving categories.", error = ex.Message });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAllCategoryProducts(int id)
    {
        try
        {
            var productList = await _db.Products.Where(p=>p.CategoryId == id).ToListAsync();
            if (productList == null || !productList.Any())
            {
                return NotFound(new { message = "Category not found." });
            }
            return Ok(productList);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while retrieving the category.", error = ex.Message });
        }
    }

}