using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Models
{
  public class Activity
  {
    public long Id { get; set; }
    public string Title { get; set; }
    public int Type { get; set; }
    [NotMapped]
    public List<string> Errors { get; set; }
  }
}