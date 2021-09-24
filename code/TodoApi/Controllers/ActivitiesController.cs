using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Managers;
using Models;
using Utilities;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;



namespace Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ActivitiesController : ControllerBase
  {
    private ActivitiesManager _ActivitiesManager;

    public ActivitiesController(ActivitiesManager activitiesManager)
    {
      _ActivitiesManager = activitiesManager;
    }

    // [HttpPost("authenticate")]
    // public IActionResult Authenticate(User model)
    // {
    //   var response = _usersManager.Authenticate(model);

    //   if (response == null)
    //     return BadRequest(new { message = "Username or password is incorrect" });

    //   return Ok(response);
    // }

    [HttpPost()]
    public IActionResult Add(Activity model)
    {
      var response = _ActivitiesManager.Add(model);

      if (response.Errors?.Count > 0)
        return BadRequest(new { message = response.Errors });

      return Ok(response);
    }

    [Authorize]
    [HttpGet]
    public IActionResult GetAll()
    {
      object users = null; //_ActivitiesManager.GetAll();
      return Ok(users);
    }


    // GET: api/TodoItems
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Activity>>> Get()
    {
      // return await _context.TodoItems.ToListAsync();
      return null;
    }

    // GET: api/Activities/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetById(long id)
    {
      Activity activityItem = null;

      if (activityItem == null)
      {
        return NotFound();
      }

      return activityItem;
    }

    // PUT: api/TodoItems/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTodoItem(long id, Activity activityItem)
    {
      if (id != activityItem.Id)
      {
        return BadRequest();
      }

      //_context.Entry(activityItem).State = EntityState.Modified;

      // try
      // {
      //   await _context.SaveChangesAsync();
      // }
      // catch (DbUpdateConcurrencyException)
      // {
      //   if (!TodoItemExists(id))
      //   {
      //     return NotFound();
      //   }
      //   else
      //   {
      //     return StatusCode(StatusCodes.Status500InternalServerError, "error changing todo");
      //   }
      // }

      return NoContent();
    }

    // POST: api/ActivityItems
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<TodoItem>> PostActivity(Activity activityItem)
    {
      // _context.TodoItems.Add(todoItem);
      // await _context.SaveChangesAsync();

      // return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
      return null;
    }

    // DELETE: api/TodoItems/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(long id)
    {
      // var todoItem = await _context.TodoItems.FindAsync(id);
      // if (todoItem == null)
      // {
      //   return NotFound();
      // }

      // _context.TodoItems.Remove(todoItem);
      // await _context.SaveChangesAsync();

      return NoContent();
    }
  }
}