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


namespace Managers
{
  public class UsersManager
  {

    public UsersManager(IOptions<AppSettingsSection> appSettings)
    {
      _appSettings = appSettings.Value;
    }

    private AppSettingsSection _appSettings = new AppSettingsSection();
    private List<User> _users = new List<User>
        {
            new User { Id = 1, FirstName = "Test", LastName = "User", Username = "test", Password = "test" }
        };
    internal User Authenticate(User model)
    {
      User user = _users.SingleOrDefault(x => x.Username == model.Username && x.Password == model.Password);

      // return null if user not found
      if (user == null) return null;

      // authentication successful so generate jwt token
      String token = generateJwtToken(user);
      user.Token = token;
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
  }


}