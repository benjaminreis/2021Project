using System;
using Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Utilities;
using TodoApi.Contexts;
using BCrypt.Net;


namespace Managers
{
  public class UsersManager
  {
    private readonly TodoContext _context;

    public UsersManager(IOptions<AppSettingsSection> appSettings, TodoContext context)
    {
      _appSettings = appSettings.Value;
      _context = context;
    }

    private AppSettingsSection _appSettings = new AppSettingsSection();
    private List<User> _users = new List<User>
        {
            new User { Id = 1, FirstName = "Test", LastName = "User", Username = "test", Password = "test" }
        };
    internal User Authenticate(User model)
    {
      User user = _context.Users.SingleOrDefault(x => x.Username == model.Username);

      // return null if user not found
      if (user == null) 
      {
        model.Errors.Add("user does not exist");
        return model;
      }

      if (!BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHashed))
      {
        model.Errors.Add("password incorrect");
        return model;
      }
      // authentication successful so generate jwt token
      String token = generateJwtToken(user);
      user.Token = token;
      return user;
    }

    internal User Add(User model)
    {
      model.Username = model.Username.ToLower();

      List<string> errors = ValidateNewUser(model);
      if (errors.Count() > 0)
      {
        model.Errors = errors;
        return model;
      }
      string salt = BCrypt.Net.BCrypt.GenerateSalt(12, 'a');
      string hashed = BCrypt.Net.BCrypt.HashPassword(model.Password, salt, false, HashType.SHA256);
      model.PasswordHashed = hashed;


      model.Password = null;
      _context.Add(model);
      var id = _context.SaveChanges();
      var user = _context.Find<User>(id);
      return user;
    }


    //TODO BEN for testing only
    internal IEnumerable<User> GetAll()
    {
      return _users;
    }
    public User GetById(int id)
    {
      return _users.FirstOrDefault(x => x.Id == id);
    }

    internal User GetByUsername(string username)
    {
      string searchUsername = username.ToLower();
      return _context.Users.Where(x => x.Username == searchUsername)?.FirstOrDefault();
    }

    private string generateJwtToken(User user)
    {
      // generate token that is valid for 7 days
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
        Expires = DateTime.UtcNow.AddDays(7),
        Issuer = _appSettings.issuer,
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }

    private List<string> ValidateNewUser(User model)
    {
      List<string> errors = new List<string>();

      User existingUser = GetByUsername(model.Username);
      if (existingUser != null)
      {
        //username must be unique in db
        errors.Add("Username already exists");
      }


      return errors;
    }
  }


}