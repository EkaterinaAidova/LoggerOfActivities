using System.Web.Http;
using ActivityLogger.BusinessLogic.Services.Contracts;
using WebMatrix.WebData;
using System.Web;
using System.Web.Security;
using System;

namespace ActivityLogger.Controllers
{
    public class AutorizationController : ApiController
    {
        ILoginingService loginingService;
        public AutorizationController(ILoginingService service)
        {
            loginingService = service;
        }
        /*   [HttpGet]
           public IHttpActionResult Get( string login, string password)
           {
               if (loginingService.IsInsertValid(login, password))
               {
                   var loginingResult = loginingService.LogIn(login, password);
                   if (loginingResult == null)
                   {
                       Logger.Log.Error("Controller: autorization  - Autorisation is failed. User is not found.");
                       return NotFound();
                   }
                   Logger.Log.Info("Controller: autorization  - Auturisation is success. Data is got");
                   return Ok(loginingResult);
               }
               Logger.Log.Error("Controller: autorization  - Autorisation is failed. Data is not valid.");
               return BadRequest();
           }
       }*/
        [HttpGet]
        public IHttpActionResult LogOut()
        {
            WebSecurity.Logout();
            return Ok();
        }
    }
}
