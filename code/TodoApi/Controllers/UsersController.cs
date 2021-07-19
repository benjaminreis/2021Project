using Microsoft.AspNetCore.Mvc;
using Managers;
using Models;
using Utilities;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class UsersController : ControllerBase
  {
    private UsersManager _usersManager;

    public UsersController(UsersManager usersManager)
    {
      _usersManager = usersManager;
    }

    [HttpPost("authenticate")]
    public IActionResult Authenticate(User model)
    {
      var response = _usersManager.Authenticate(model);

      if (response == null)
        return BadRequest(new { message = "Username or password is incorrect" });

      return Ok(response);
    }

    [HttpPost("createUser")]
    public IActionResult Add(User model)
    {
      var response = _usersManager.Add(model);

      if (response.Errors?.Count > 0)
        return BadRequest(new { message = response.Errors });

      return Ok(response);
    }

    [Authorize]
    [HttpGet]
    public IActionResult GetAll()
    {
      var users = _usersManager.GetAll();
      return Ok(users);
    }
  }
}