
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ActivityLogger.BusinessLogic.Services.Contracts;
using ActivityLogger.BusinessLogic.DataTransferObjects;
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
      /*  IUserRepository repository;
        public UsersController(IUserRepository rep)
        {
            repository = rep;
        }
        [HttpPost]
        public void Post([FromBody]User ourUser)
        {
            repository.Create(ourUser);
        }
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return repository.GetUsers();
        }
        [HttpGet]
        public User Get(int id)
        {
            return repository.Get(id);
        }
        [HttpPut]
        public void Put([FromBody]User ourUser)
        {
            repository.Update(ourUser);
        }
        [HttpDelete]
        public void Delete(int id)
        {
            repository.Delete(id);
        }*/
    }
}
