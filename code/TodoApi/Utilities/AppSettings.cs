
using Microsoft.Extensions.Configuration;

namespace Utilities
{
  // internal class AppSettings
  // {


  //   internal IConfiguration configuration { get; set; }
  //   internal string Secret { get; set; }

  //   internal AppSettings()

  //   {
  //     AppSettingsSection appSettings = (AppSettingsSection)configuration.GetSection("AppSettings");
  //     Secret = appSettings.Secret;
  //   }

  // }


  public class AppSettingsSection
  {
    public string Secret { get; set; }
    public string issuer { get; set; }

  }


}