using TodoApi.Contexts;
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
  public class ActivitiesManager
  {
    private readonly TodoContext _context;

    public ActivitiesManager(IOptions<AppSettingsSection> appSettings, TodoContext context)
    {
      _appSettings = appSettings.Value;
      _context = context;
    }

    private AppSettingsSection _appSettings = new AppSettingsSection();


    internal Activity Add(Activity model)
    {
      return new Activity();
    }


  }


}