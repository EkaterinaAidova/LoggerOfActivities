using System;
using System.Linq;
using System.Web.Http;
using ActivityLogger.BusinessLogic.Services.Contracts;
using WebMatrix.WebData;

namespace ActivityLogger.Controllers
{
    public class UserController : ApiController
    {
        IDefineUserService definingService;
        public UserController(IDefineUserService service)
        {
            definingService = service;
        }
        [HttpGet]
        [Route("api/user/{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var user = definingService.GetUser(id);
            if (user.IsNotNull())
            {
                Logger.Log.Info(String.Concat("Controller: users - User ", user.ID.ToString(), " is logged in"));
                return Ok(user);
            }
            Logger.Log.Error(String.Concat("Controller: users - User ", user.ID.ToString(), " is not exist"));
            return NotFound();
        }
        [HttpGet]
       [Route("api/user")]
        public IHttpActionResult GetUser()
        {
            if (WebSecurity.IsAuthenticated)
            {
                return Get(WebSecurity.GetUserId(WebSecurity.CurrentUserName));
             }
            return NotFound();

        }
      
  
    }
}
