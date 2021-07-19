// using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;


namespace Models
{
  public class User
  {
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }

    [NotMapped]
    public string Token { get; set; }

    [NotMapped]
    public string Password { get; set; }
    public string PasswordHashed { get; set; }

    [NotMapped]
    public List<string> Errors { get; set; }

  }
}