using System;
using System.Linq;
using System.Web.Http;
using ActivityLogger.BusinessLogic.Services.Contracts;
using WebMatrix.WebData;
using System.Web.Security;
using ActivityLogger.BusinessLogic.DataTransferObjects;

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
            var roles = (SimpleRoleProvider)Roles.Provider;
            var user = definingService.GetUser(id);
            if (user.IsNotNull())
            {
                Logger.Log.Info(string.Concat("Controller: users - User ", user.ID.ToString(), " is logged in"));
                UserAccount accountInfo = new UserAccount();
                accountInfo.UserInfo = user;
                accountInfo.UserRoles = roles.GetRolesForUser(user.Email);
                return Ok(accountInfo);
            }
            Logger.Log.Error(string.Concat("Controller: users - User ", user.ID.ToString(), " is not exist"));
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
        [HttpDelete]
        public IHttpActionResult DeleteUser(int id)
        {
           definingService.DeleteUser(id);
            return Ok();
        }
      
        [HttpGet]
        [Route("api/user/All")]
        public IHttpActionResult GetAll()
        {
            var users = definingService.GetUsers();
            return Ok(users);
        }

  
    }
}
