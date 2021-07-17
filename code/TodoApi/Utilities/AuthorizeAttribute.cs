// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.Mvc.Filters;
// using System;
// using Models;

// //https://jasonwatmore.com/post/2021/04/30/net-5-jwt-authentication-tutorial-with-example-api
// //https://github.com/cornflourblue/dotnet-5-jwt-authentication-api

// [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
// public class AuthorizeAttribute : Attribute, IAuthorizationFilter
// {
//   public void OnAuthorization(AuthorizationFilterContext context)
//   {
//     var user = (User)context.HttpContext.Items["User"];
//     if (user == null)
//     {
//       // not logged in
//       context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
//     }
//   }
// }