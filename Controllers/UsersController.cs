using System;
using System.Linq;
using System.Web.Http;
using ActivityLogger.BusinessLogic.Services.Contracts;
namespace ActivityLogger.Controllers
{
    public class UsersController : ApiController
    {
        IDefineUserService definingService;
        public UsersController(IDefineUserService service)
        {
            definingService = service;
        }
        [HttpGet]
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
    }
}
