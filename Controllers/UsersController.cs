
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ActivityLogger.Models;
using ActivityLogger.Models.Repositories.Contracts;
namespace ActivityLogger.Controllers
{
    public class UsersController : ApiController
    {
        IUserRepository repository;
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
        }
    }
}
